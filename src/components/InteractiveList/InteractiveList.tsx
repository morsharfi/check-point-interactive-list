import React from "react";
import { InteractiveListProps } from "./types";
import { useInteractiveList } from "./useInteractiveList";
import { ItemRow } from "./ItemRow/ItemRow";
import { ItemEditRow } from "./ItemEditRow/ItemEditRow";
import { InputRow } from "./InputRow/InputRow";
import "./shared.css";
import "./InteractiveList.css";

export const InteractiveList: React.FC<InteractiveListProps> = (props) => {
  const {
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
  } = useInteractiveList(props);

  const { items, loading, readOnly, error, emptyMessage, placeholder, maxRows = 10 } = props;

  return (
    <div
      className={
        "il-wrapper" +
        (error ? " il-wrapper--error" : "") +
        (readOnly ? " il-wrapper--readonly" : "")
      }
    >
      <div className="il-header">Interactive List</div>

      {!readOnly && (
        <InputRow
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputError={!!inputError}
          loading={!!loading}
          placeholder={placeholder}
          onAdd={addItem}
        />
      )}

      {items.length === 0 ? (
        <div className="il-empty-state">{emptyMessage}</div>
      ) : (
        <ul 
          className="il-items"
          style={{
            maxHeight: `${maxRows * 44}px`,
            overflowY: items.length > maxRows ? 'auto' : 'visible'
          }}
        >
          {items.map((text, i) => (
            <li key={i} className="il-item">
              {editingIndex === i ? (
                <ItemEditRow
                  value={editingValue}
                  onChange={setEditingValue}
                  onSave={commitEditing}
                  onCancel={cancelEditing}
                  hasError={!!editingError}
                />
              ) : (
                <ItemRow
                  text={text}
                  onEdit={() => startEditing(i)}
                  onRemove={() => removeItem(i)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
