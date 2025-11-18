import { useState, useCallback } from "react";
import { InteractiveListProps, ValidationErrorKind } from "./types";
import { validateValue } from "./validation";

export function useInteractiveList(props: InteractiveListProps) {
  const { items, onChange, customValidate, regexValidate, loading, readOnly } = props;

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<ValidationErrorKind>(null);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [editingError, setEditingError] = useState<ValidationErrorKind>(null);

  const addItem = useCallback(async () => {
    if (readOnly || loading) return;
    const err = await validateValue({
      value: inputValue,
      customValidate,
      regexValidate,
      editing: false,
    });
    if (err) {
      setInputError(err);
      return;
    }
    onChange([...items, inputValue.trim()]);
    setInputValue("");
    setInputError(null);
  }, [inputValue, items, loading, readOnly, customValidate, regexValidate, onChange]);

  const startEditing = useCallback(
    (i: number) => {
      if (readOnly || loading) return;
      setEditingIndex(i);
      setEditingValue(items[i]);
      setEditingError(null);
    },
    [items, loading, readOnly]
  );

  const cancelEditing = useCallback(() => {
    setEditingIndex(null);
    setEditingValue("");
    setEditingError(null);
  }, []);

  const commitEditing = useCallback(async () => {
    if (editingIndex === null || readOnly || loading) return;
    const err = await validateValue({
      value: editingValue,
      customValidate,
      regexValidate,
      editing: true,
    });
    if (err) {
      setEditingError(err);
      return;
    }
    const next = [...items];
    next[editingIndex] = editingValue.trim();
    onChange(next);
    cancelEditing();
  }, [
    editingIndex,
    editingValue,
    items,
    loading,
    readOnly,
    customValidate,
    regexValidate,
    onChange,
    cancelEditing,
  ]);

  const removeItem = useCallback(
    (i: number) => {
      if (readOnly || loading) return;
      onChange(items.filter((_, idx) => idx !== i));
    },
    [items, loading, readOnly, onChange]
  );

  return {
    inputValue,
    setInputValue,
    inputError,
    editingIndex,
    editingValue,
    setEditingValue,
    editingError,
    addItem,
    startEditing,
    cancelEditing,
    commitEditing,
    removeItem,
  };
}
