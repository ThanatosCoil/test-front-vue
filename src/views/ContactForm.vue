<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormGenerator from "../components/FormGenerator.vue";
import type { FormConfig, FormValues } from "../types";

const store = useStore();
const router = useRouter();

// Конфигурация формы
const contactFormConfig: FormConfig = {
  id: "contact-form",
  title: "Контактная форма",
  fields: [
    {
      type: "input",
      name: "name",
      label: "Ваше имя",
      placeholder: "Введите ваше имя",
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
      name: "phone",
      label: "Телефон",
      placeholder: "+7 (___) ___-__-__",
      attrs: {
        type: "tel",
      },
    },
    {
      type: "select",
      name: "subject",
      label: "Тема обращения",
      required: true,
      options: [
        { value: "general", label: "Общий вопрос" },
        { value: "support", label: "Техническая поддержка" },
        { value: "billing", label: "Вопросы по оплате" },
        { value: "other", label: "Другое" },
      ],
    },
    {
      type: "textarea",
      name: "message",
      label: "Сообщение",
      placeholder: "Введите ваше сообщение",
      required: true,
    },
  ],
  submitLabel: "Отправить",
  cancelLabel: "Отмена",
};

// Значения формы
const formValues = ref<FormValues>({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

// Обработка отправки формы
const handleSubmit = (values: FormValues) => {
  // Сохранение данных в хранилище
  store
    .dispatch("saveFormValues", {
      formId: contactFormConfig.id,
      values,
    })
    .then(() => {
      window.alert("Форма успешно отправлена!");
      // Перенаправление на главную страницу
      router.push("/");
    });
};

// Обработка отмены
const handleCancel = () => {
  if (window.confirm("Вы уверены, что хотите отменить заполнение формы?")) {
    router.push("/");
  }
};
</script>

<template>
  <div class="contact-form-page">
    <div class="page-header">
      <button class="back-button" @click="router.push('/')">← Назад</button>
      <h1>Контактная форма</h1>
    </div>

    <div class="form-container">
      <FormGenerator
        :config="contactFormConfig"
        v-model="formValues"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;

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
}
</style>
