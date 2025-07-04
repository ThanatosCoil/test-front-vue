<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import FormGenerator from "../components/FormGenerator.vue";
import type { FormConfig, FormValues } from "../types";

const store = useStore();
const router = useRouter();

// Конфигурация формы опроса
const surveyFormConfig: FormConfig = {
  id: "survey-form",
  title: "Форма опроса",
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
      name: "age",
      label: "Возраст",
      placeholder: "Введите ваш возраст",
      attrs: {
        type: "number",
        min: 18,
        max: 100,
      },
    },
    {
      type: "select",
      name: "occupation",
      label: "Род деятельности",
      required: true,
      options: [
        { value: "student", label: "Студент" },
        { value: "employed", label: "Работающий" },
        { value: "self_employed", label: "Самозанятый" },
        { value: "unemployed", label: "Безработный" },
        { value: "retired", label: "Пенсионер" },
      ],
    },
    {
      type: "select",
      name: "experience",
      label: "Опыт работы с Vue.js",
      options: [
        { value: "none", label: "Нет опыта" },
        { value: "beginner", label: "Начинающий (до 1 года)" },
        { value: "intermediate", label: "Средний (1-3 года)" },
        { value: "advanced", label: "Продвинутый (более 3 лет)" },
      ],
    },
    {
      type: "checkbox",
      name: "subscribe",
      label: "Подписка на рассылку",
      placeholder: "Я хочу получать новости и обновления по email",
    },
    {
      type: "checkbox",
      name: "terms",
      label: "Согласие с условиями",
      placeholder: "Я согласен с условиями использования сервиса",
      required: true,
    },
    {
      type: "textarea",
      name: "feedback",
      label: "Ваш отзыв о Vue.js",
      placeholder: "Поделитесь вашим мнением о Vue.js...",
    },
  ],
  submitLabel: "Отправить ответы",
  cancelLabel: "Отменить",
};

// Значения формы
const formValues = ref<FormValues>({
  name: "",
  age: null,
  occupation: "",
  experience: "none",
  subscribe: false,
  terms: false,
  feedback: "",
});

// Обработка отправки формы
const handleSubmit = (values: FormValues) => {
  // Сохранение данных в хранилище
  store
    .dispatch("saveFormValues", {
      formId: surveyFormConfig.id,
      values,
    })
    .then(() => {
      window.alert("Спасибо за участие в опросе!");
      router.push("/");
    });
};

// Обработка отмены
const handleCancel = () => {
  if (window.confirm("Вы уверены, что хотите отменить заполнение опроса?")) {
    router.push("/");
  }
};
</script>

<template>
  <div class="survey-form-page">
    <div class="page-header">
      <button class="back-button" @click="router.push('/')">← Назад</button>
      <h1>Опрос пользователей Vue.js</h1>
    </div>

    <div class="form-container">
      <p class="form-description">
        Пожалуйста, ответьте на несколько вопросов о вашем опыте использования
        Vue.js. Ваши ответы помогут нам улучшить наш продукт.
      </p>

      <FormGenerator
        :config="surveyFormConfig"
        v-model="formValues"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.survey-form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px;

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

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
    padding: 20px;

    .form-description {
      color: #666;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 30px;
      padding: 0 10px;
    }
  }
}
</style>
