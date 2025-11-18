export interface InteractiveListProps {
  items: string[];
  onChange: (nextItems: string[]) => void;
  customValidate?: (value: string, editing: boolean) => boolean | Promise<boolean>;
  regexValidate?: RegExp;
  loading?: boolean;
  readOnly?: boolean;
  error?: boolean;
  emptyMessage?: string;
  placeholder?: string;
}
export type ValidationErrorKind = "empty" | "custom" | "regex" | null;
