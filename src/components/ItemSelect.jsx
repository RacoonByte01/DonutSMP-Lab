import { useId, useMemo, useState } from "react";
import { searchItems } from "../utils/items";

function ItemSelect({ value = "", onValue, ...props }) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = useMemo(() => searchItems(value), [value]);

  function select(item) {
    onValue(item.displayName);
    setOpen(false);
    setActive(-1);
  }

  function handleChange(event) {
    onValue(event.target.value);
    setOpen(true);
    setActive(-1);
  }

  function handleKeyDown(event) {
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      select(matches[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const visible = open && matches.length > 0;

  return (
    <>
      <input
        {...props}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={visible}
        aria-controls={visible ? listId : undefined}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {visible && (
        <ul
          id={listId}
          role="listbox"
          className="list-group position-absolute w-100 shadow"
          style={{
            top: "100%",
            zIndex: 1050,
            maxHeight: "40vh",
            overflowY: "auto",
          }}
        >
          {matches.map((item, index) => (
            <li
              key={item.name}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              className={`list-group-item list-group-item-action ${
                index === active ? "active" : ""
              }`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(item)}
            >
              {item.displayName}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ItemSelect;
