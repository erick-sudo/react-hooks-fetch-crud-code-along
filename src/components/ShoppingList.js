import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Add useEffect hook
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch("http://localhost:4000/items")
    .then((res) => res.json())
    .then((data) => setItems(data));
  };

   // add this callback function
   function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  // add this function!
  function handleAddItem(newItem) {
    setItems([newItem, ...items]);
  }

  // add this callback function
  function handleDeleteItem(deletedItem) {
    setItems(items.filter((item) => item.id!== deletedItem.id));
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onDeleteItem={handleDeleteItem} key={item.id} onUpdateItem={handleUpdateItem} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
