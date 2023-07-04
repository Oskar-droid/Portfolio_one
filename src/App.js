import React, { useState, useEffect } from "react";
import List from "./components/List";
import Context from "./Context";
import Loader from "./Loader";
import Modal from "./components/Modal/Modal";

const AddItem = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import("./components/AddItem"))
  }, 2000)
})
)

function App() {
  let [itemProps, setItemProps] = React.useState([]);
  let [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((itemProps) => {
        setTimeout(() => {
          setItemProps(itemProps);
          setLoading(false);
        }, 1000);
      });
  }, []);

  function toggleTodo(id) {
    setItemProps(
      (itemProps = itemProps.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      }))
    );
  }

  function removeItem(id) {
    setItemProps(itemProps.filter((item) => item.id != id));
  }

  function Add(title) {
    setItemProps(
      itemProps.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeItem }}>
      <div className="wrapper">
        <h2>To Do List</h2>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddItem onCreate={Add} />
        </React.Suspense>
        {loading && <Loader />}
        {itemProps.length ? (
          <List itemProps={itemProps} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>You Have Nothing To Do</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
