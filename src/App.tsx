import React, { useState } from "react";
import { InteractiveList } from "./components/InteractiveList";

export default function App() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const custom = async (val: string, editing: boolean) => {
    if (editing) return val.length >= 3;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    return val.length >= 3;
  };

  return (
    <div>
      <InteractiveList
        items={items}
        onChange={setItems}
        customValidate={custom}
        emptyMessage="No Network / IP Address / IP range or Domain Added just yet"
        loading={loading}
        placeholder="(e.g: www.website.com/) use Enter or + to add it to list"
      />
    </div>
  );
}
