export interface FormField {
  type: "input" | "select" | "checkbox" | "textarea";
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string | number; label: string }>;
  attrs?: Record<string, any>;
}

export interface FormConfig {
  id: string;
  title?: string;
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
}

export type FormValues = Record<string, any>;
