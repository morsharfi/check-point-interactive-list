import React from "react";
import { ErrorIcon } from "../Icons/ErrorIcon";
import "../shared.css";
import "./InputRow.css";

interface InputRowProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  inputError: boolean;
  loading: boolean;
  placeholder?: string;
  onAdd: () => void;
}

export const InputRow: React.FC<InputRowProps> = ({
  inputValue,
  setInputValue,
  inputError,
  loading,
  placeholder,
  onAdd,
}) => {
  return (
    <div
      className={"il-input-row" + (inputError ? " il-input-row--error" : "")}
    >
      <input
        className="il-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        disabled={loading}
      />

      {loading ? (
        <div className="il-add-btn il-add-btn--loading">
          <span className="il-spinner" />
        </div>
      ) : inputError ? (
        <div className="il-error-icon-wrapper">
          <ErrorIcon />
        </div>
      ) : (
        <button
          className="il-add-btn"
          onClick={onAdd}
          aria-label="Add item"
        >
          +
        </button>
      )}
    </div>
  );
};

