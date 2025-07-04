<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { FormConfig, FormValues } from "../types";

const props = defineProps<{
  config: FormConfig;
  modelValue: FormValues;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: FormValues): void;
  (e: "submit", values: FormValues): void;
  (e: "cancel"): void;
}>();

const slots = useSlots();

const formValues = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const updateField = (name: string, value: any) => {
  emit("update:modelValue", { ...props.modelValue, [name]: value });
};

const hasCustomSlot = (fieldName: string) => {
  return !!slots[`field-${fieldName}`];
};

const handleSubmit = () => {
  emit("submit", formValues.value);
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-generator">
    <h2 v-if="config.title" class="form-title">{{ config.title }}</h2>

    <div v-for="field in config.fields" :key="field.name" class="form-field">
      <!-- Использование слотов для кастомизации полей -->
      <slot
        v-if="hasCustomSlot(`field-${field.name}`)"
        :name="`field-${field.name}`"
        :field="field"
        :value="modelValue[field.name]"
        :onUpdate="(value: any) => updateField(field.name, value)"
      />

      <!-- Стандартные поля, если слот не определен -->
      <template v-else>
        <label :for="field.name" class="field-label">
          {{ field.label }}
          <span v-if="field.required" class="required">*</span>
        </label>

        <!-- Input field -->
        <input
          v-if="field.type === 'input'"
          :id="field.name"
          v-model="formValues[field.name]"
          :placeholder="field.placeholder"
          :required="field.required"
          :disabled="field.disabled"
          v-bind="field.attrs"
          class="form-input"
        />

        <!-- Select field -->
        <select
          v-else-if="field.type === 'select'"
          :id="field.name"
          v-model="formValues[field.name]"
          :required="field.required"
          :disabled="field.disabled"
          v-bind="field.attrs"
          class="form-select"
        >
          <option value="" disabled selected>
            {{ field.placeholder || "Выберите..." }}
          </option>
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Checkbox field -->
        <div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
          <input
            type="checkbox"
            :id="field.name"
            v-model="formValues[field.name]"
            :required="field.required"
            :disabled="field.disabled"
            v-bind="field.attrs"
            class="form-checkbox"
          />
          <span class="checkbox-label">{{ field.placeholder || "" }}</span>
        </div>

        <!-- Textarea field -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          v-model="formValues[field.name]"
          :placeholder="field.placeholder"
          :required="field.required"
          :disabled="field.disabled"
          v-bind="field.attrs"
          class="form-textarea"
        ></textarea>
      </template>
    </div>

    <div class="form-actions">
      <slot name="actions" :submit="handleSubmit" :cancel="handleCancel">
        <button type="button" @click="handleCancel" class="btn btn-cancel">
          {{ config.cancelLabel || "Отмена" }}
        </button>
        <button type="submit" class="btn btn-submit">
          {{ config.submitLabel || "Сохранить" }}
        </button>
      </slot>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-generator {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  .form-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .form-field {
    margin-bottom: 20px;

    .field-label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;

      .required {
        color: #e53935;
        margin-left: 3px;
      }
    }

    .form-input,
    .form-select,
    .form-textarea {
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
    }

    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;

      .form-checkbox {
        margin-right: 8px;
      }

      .checkbox-label {
        font-size: 0.95rem;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.1s;

      &:active {
        transform: translateY(1px);
      }
    }

    .btn-cancel {
      background-color: #f5f5f5;
      color: #333;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .btn-submit {
      background-color: #4a90e2;
      color: white;

      &:hover {
        background-color: #3a80d2;
      }
    }
  }
}
</style>
