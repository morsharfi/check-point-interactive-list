import React from "react";
import { EditIcon } from "../Icons/EditIcon";
import { TrashIcon } from "../Icons/TrashIcon";
import "../shared.css";
import "./ItemRow.css";

interface ItemRowProps {
  text: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const ItemRow = ({ text, onEdit, onRemove }: ItemRowProps) => {
  return (
    <div className="il-item-view">
      <span className="il-item-label">{text}</span>
      <div className="il-item-actions">
        <button className="il-icon-btn" aria-label="Edit" onClick={onEdit}>
          <EditIcon />
        </button>
        <button className="il-icon-btn" aria-label="Remove" onClick={onRemove}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
