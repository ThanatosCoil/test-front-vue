import { createStore } from "vuex";
import type { FormValues } from "../types";

export interface State {
  formValues: Record<string, FormValues>;
}

export default createStore<State>({
  state: {
    formValues: {},
  },
  mutations: {
    setFormValues(
      state,
      { formId, values }: { formId: string; values: FormValues }
    ) {
      state.formValues = {
        ...state.formValues,
        [formId]: values,
      };
    },
    resetFormValues(state, formId: string) {
      if (state.formValues[formId]) {
        const { [formId]: _, ...rest } = state.formValues;
        state.formValues = rest;
      }
    },
  },
  actions: {
    saveFormValues(
      { commit },
      { formId, values }: { formId: string; values: FormValues }
    ) {
      // Здесь может быть асинхронный запрос к API для сохранения данных
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          commit("setFormValues", { formId, values });
          resolve();
        }, 300);
      });
    },
  },
  getters: {
    getFormValues: (state) => (formId: string) => {
      return state.formValues[formId] || {};
    },
  },
});
