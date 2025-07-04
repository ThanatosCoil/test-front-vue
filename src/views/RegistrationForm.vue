<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormGenerator from "../components/FormGenerator.vue";
import type { FormConfig, FormValues } from "../types";

const store = useStore();
const router = useRouter();

// Конфигурация формы регистрации
const registrationFormConfig: FormConfig = {
  id: "registration-form",
  title: "Регистрация аккаунта",
  fields: [
    {
      type: "input",
      name: "username",
      label: "Имя пользователя",
      placeholder: "Введите имя пользователя",
      required: true,
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      placeholder: "Введите ваш email",
      required: true,
      attrs: {
        type: "email",
      },
    },
    {
      type: "input",
      name: "password",
      label: "Пароль",
      placeholder: "Введите пароль",
      required: true,
      attrs: {
        type: "password",
      },
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Подтверждение пароля",
      placeholder: "Подтвердите пароль",
      required: true,
      attrs: {
        type: "password",
      },
    },
    {
      type: "checkbox",
      name: "agreement",
      label: "Пользовательское соглашение",
      placeholder: "Я принимаю условия пользовательского соглашения",
      required: true,
    },
  ],
  submitLabel: "Зарегистрироваться",
  cancelLabel: "Отмена",
};

// Значения формы
const formValues = ref<FormValues>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});

// Проверка совпадения паролей
const passwordsMatch = ref(true);

// Проверка сложности пароля
const getPasswordStrength = (password: string): number => {
  if (!password) return 0;

  let strength = 0;

  // Длина пароля
  if (password.length >= 8) strength += 1;

  // Наличие цифр
  if (/\d/.test(password)) strength += 1;

  // Наличие букв в нижнем регистре
  if (/[a-z]/.test(password)) strength += 1;

  // Наличие букв в верхнем регистре
  if (/[A-Z]/.test(password)) strength += 1;

  // Наличие спецсимволов
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  return strength;
};

// Показать соглашение
const showAgreement = () => {
  window.alert("Открытие пользовательского соглашения");
};

// Обработка отправки формы
const handleSubmit = (values: FormValues) => {
  // Проверка совпадения паролей
  if (values.password !== values.confirmPassword) {
    passwordsMatch.value = false;
    window.alert("Пароли не совпадают!");
    return;
  }

  passwordsMatch.value = true;

  // Сохранение данных в хранилище
  store
    .dispatch("saveFormValues", {
      formId: registrationFormConfig.id,
      values: {
        ...values,
        // Не сохраняем подтверждение пароля
        confirmPassword: undefined,
      },
    })
    .then(() => {
      window.alert("Регистрация успешно завершена!");
      router.push("/");
    });
};

// Обработка отмены
const handleCancel = () => {
  if (window.confirm("Вы уверены, что хотите отменить регистрацию?")) {
    router.push("/");
  }
};
</script>

<template>
  <div class="registration-form-page">
    <div class="page-header">
      <button class="back-button" @click="router.push('/')">← Назад</button>
      <h1>Регистрация нового аккаунта</h1>
    </div>

    <div class="form-container">
      <FormGenerator
        :config="registrationFormConfig"
        v-model="formValues"
        @submit="handleSubmit"
        @cancel="handleCancel"
      >
        <!-- Кастомизация поля пароля с индикатором сложности -->
        <template #field-password="{ field, value, onUpdate }">
          <label :for="field.name" class="field-label">
            {{ field.label }}
            <span v-if="field.required" class="required">*</span>
          </label>

          <div class="password-field">
            <input
              :id="field.name"
              :type="field.attrs?.type || 'text'"
              :value="value"
              @input="(e) => onUpdate((e.target as HTMLInputElement).value)"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              class="form-input"
            />

            <div class="password-strength" v-if="value">
              <div class="strength-label">Сложность пароля:</div>
              <div class="strength-meter">
                <div
                  class="strength-value"
                  :style="{ width: `${getPasswordStrength(value) * 20}%` }"
                  :class="`strength-${getPasswordStrength(value)}`"
                ></div>
              </div>
              <div class="strength-text">
                {{
                  ["Очень слабый", "Слабый", "Средний", "Хороший", "Сильный"][
                    Math.min(getPasswordStrength(value), 4)
                  ]
                }}
              </div>
            </div>
          </div>
        </template>

        <!-- Кастомизация поля подтверждения пароля -->
        <template #field-confirmPassword="{ field, value, onUpdate }">
          <label :for="field.name" class="field-label">
            {{ field.label }}
            <span v-if="field.required" class="required">*</span>
          </label>

          <div class="confirm-password-field">
            <input
              :id="field.name"
              :type="field.attrs?.type || 'text'"
              :value="value"
              @input="(e) => onUpdate((e.target as HTMLInputElement).value)"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              class="form-input"
              :class="{ 'input-error': !passwordsMatch && value }"
            />

            <div v-if="!passwordsMatch && value" class="password-mismatch">
              Пароли не совпадают
            </div>
          </div>
        </template>

        <!-- Кастомизация поля соглашения -->
        <template #field-agreement="{ field, value, onUpdate }">
          <div class="agreement-field">
            <input
              type="checkbox"
              :id="field.name"
              :checked="value"
              @change="(e) => onUpdate((e.target as HTMLInputElement).checked)"
              :required="field.required"
              :disabled="field.disabled"
              class="form-checkbox"
            />
            <label :for="field.name" class="agreement-label">
              {{ field.placeholder }}
              <span v-if="field.required" class="required">*</span>
              <a href="#" class="agreement-link" @click.prevent="showAgreement">
                Ознакомиться с соглашением
              </a>
            </label>
          </div>
        </template>
      </FormGenerator>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.registration-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px;

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .back-button {
      background: none;
      border: none;
      color: #4a90e2;
      font-size: 1rem;
      cursor: pointer;
      padding: 5px 10px;
      margin-right: 15px;

      &:hover {
        text-decoration: underline;
      }
    }

    h1 {
      font-size: 1.8rem;
      color: #333;
      margin: 0;
    }
  }

  .form-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .field-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;

    .required {
      color: #e53935;
      margin-left: 3px;
    }
  }

  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }

    &.input-error {
      border-color: #e53935;
    }
  }

  .password-field,
  .confirm-password-field {
    margin-bottom: 10px;
  }

  .password-strength {
    margin-top: 8px;

    .strength-label {
      font-size: 0.8rem;
      color: #666;
      margin-bottom: 3px;
    }

    .strength-meter {
      height: 5px;
      background-color: #eee;
      border-radius: 3px;
      overflow: hidden;

      .strength-value {
        height: 100%;
        transition: width 0.3s;

        &.strength-0 {
          background-color: #ff5252;
        }
        &.strength-1 {
          background-color: #ff9100;
        }
        &.strength-2 {
          background-color: #ffb300;
        }
        &.strength-3 {
          background-color: #8bc34a;
        }
        &.strength-4,
        &.strength-5 {
          background-color: #4caf50;
        }
      }
    }

    .strength-text {
      font-size: 0.75rem;
      text-align: right;
      margin-top: 3px;
    }
  }

  .password-mismatch {
    color: #e53935;
    font-size: 0.8rem;
    margin-top: 5px;
  }

  .agreement-field {
    display: flex;
    align-items: flex-start;
    margin: 15px 0;

    .form-checkbox {
      margin-top: 3px;
      margin-right: 10px;
    }

    .agreement-label {
      font-size: 0.9rem;
      line-height: 1.4;

      .agreement-link {
        display: block;
        color: #4a90e2;
        margin-top: 5px;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
