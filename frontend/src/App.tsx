import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoLists from "./com/ListTodoLists";
import ToDoList from "./com/TodoList";

function App() {
  const [listSummaries, setListSummaries] = useState<ListSummary[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    try {
      const response = await axios.get<ListSummary[]>("/api/lists");
      setListSummaries(response.data);
    } catch (error) {
      console.error("Error loading list summaries:", error);
    }
  }

  function handleNewToDoList(newName: string) {
    if (!newName.trim()) return;

    const updateData = async () => {
      try {
        await axios.post("/api/lists", { name: newName });
        reloadData().catch(console.error);
      } catch (error) {
        console.error("Error creating new to-do list:", error);
      }
    };
    updateData();
  }

  function handleDeleteToDoList(id: number) {
    const updateData = async () => {
      try {
        await axios.delete(`/api/lists/${id}`);
        reloadData().catch(console.error);
      } catch (error) {
        console.error("Error deleting to-do list:", error);
      }
    };
    updateData();
  }

  function handleSelectList(id: number) {
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData().catch(console.error);
  }

  if (selectedItem === null) {
    return (
      <div className="App">
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;

// Define ListSummary type used in listSummaries
interface ListSummary {
  id: number;
  name: string;
  item_count: number;
}
