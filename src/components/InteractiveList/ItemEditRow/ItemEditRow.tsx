import React from "react";
import { ErrorIcon } from "../Icons/ErrorIcon";
import { CancelIcon } from "../Icons/CancelIcon";
import { SaveIcon } from "../Icons/SaveIcon";
import "../shared.css";
import "./ItemEditRow.css";

interface ItemEditRowProps {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  hasError: boolean;
}

export const ItemEditRow = ({
  value,
  onChange,
  onSave,
  onCancel,
  hasError,
}: ItemEditRowProps) => {
  return (
    <div className={"il-item-edit" + (hasError ? " il-item-edit--error" : "")}>
      <input
        className="il-input il-input--inline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
      />
      <button className="il-icon-btn" onClick={onSave}>
        <SaveIcon />
      </button>
      <button className="il-icon-btn" onClick={onCancel}>
        <CancelIcon />
      </button>
      {hasError && <ErrorIcon />}
    </div>
  );
};
