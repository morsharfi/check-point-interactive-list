import { ValidationErrorKind } from "./types";

interface ValidateValueProps {
  value: string;
  customValidate?: (value: string, editing: boolean) => boolean | Promise<boolean>;
  regexValidate?: RegExp;
  editing?: boolean;
}
export async function validateValue({
  value,
  customValidate,
  regexValidate,
  editing,
}: ValidateValueProps): Promise<ValidationErrorKind> {
  const trimmed = value.trim();
  if (!trimmed) return "empty";
  if (customValidate) {
    try {
      const ok = await customValidate(trimmed, editing ?? false);
      if (!ok) return "custom";
    } catch (error) {
      console.error(error);
      return "custom";
    }
  }
  if (regexValidate && !regexValidate.test(trimmed)) return "regex";
  return null;
}
