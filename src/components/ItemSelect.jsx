import { itemOptions } from "../utils/items";

const LIST_ID = "minecraft-items";

export function ItemDatalist() {
  return (
    <datalist id={LIST_ID}>
      {itemOptions.map(({ name, displayName }) => (
        <option key={name} value={displayName} />
      ))}
    </datalist>
  );
}

function ItemSelect(props) {
  return <input {...props} list={LIST_ID} />;
}

export default ItemSelect;
