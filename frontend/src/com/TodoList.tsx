
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiSolidTrash } from "react-icons/bi";

type ToDoItem = {
  id: number;
  label: string;
  checked: boolean;
};

type ListData = {
  id: number;
  name: string;
  items: ToDoItem[];
};

type ToDoListProps = {
  listId: number;
  handleBackButton: () => void;
};

function ToDoList({ listId, handleBackButton }: ToDoListProps) {
  const labelRef = useRef<HTMLInputElement>(null);
  const [listData, setListData] = useState<ListData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ListData>(`/api/lists/${listId}`);
        setListData(response.data);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchData();
  }, [listId]);

  const handleCreateItem = (label: string) => {
    if (!label) return;

    const updateData = async () => {
      try {
        const response = await axios.post<ListData>(
          `/api/lists/${listData?.id}/items/`,
          { label }
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error creating item:", error);
      }
    };
    updateData();
  };

  const handleDeleteItem = (id: number) => {
    const updateData = async () => {
      try {
        const response = await axios.delete<ListData>(
          `/api/lists/${listData?.id}/items/${id}`
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };
    updateData();
  };

  const handleCheckToggle = (itemId: number, newState: boolean) => {
    const updateData = async () => {
      try {
        const response = await axios.patch<ListData>(
          `/api/lists/${listData?.id}/checked_state`,
          { item_id: itemId, checked_state: newState }
        );
        setListData(response.data);
      } catch (error) {
        console.error("Error toggling item check state:", error);
      }
    };
    updateData();
  };

  if (listData === null) {
    return (
      <div className="ToDoList loading">
        <button className="back" onClick={handleBackButton}>
          Back
        </button>
        Loading to-do list ...
      </div>
    );
  }

  return (
    <div className="ToDoList">
      <button className="back" onClick={handleBackButton}>
        Back
      </button>
      <h1>List: {listData.name}</h1>
      <div className="box">
        <label>
          New Item:&nbsp;
          <input ref={labelRef} type="text" />
        </label>
        <button
          onClick={() => {
            if (labelRef.current) {
              handleCreateItem(labelRef.current.value);
              labelRef.current.value = "";
            }
          }}
        >
          New
        </button>
      </div>
      {listData.items.length > 0 ? (
        listData.items.map((item) => (
          <div
            key={item.id}
            className={item.checked ? "item checked" : "item"}
            onClick={() => handleCheckToggle(item.id, !item.checked)}
          >
            <span>{item.checked ? "✅" : "⬜️"} </span>
            <span className="label">{item.label} </span>
            <span className="flex"></span>
            <span
              className="trash"
              onClick={(evt) => {
                evt.stopPropagation();
                handleDeleteItem(item.id);
              }}
            >
              <BiSolidTrash />
            </span>
          </div>
        ))
      ) : (
        <div className="box">There are currently no items.</div>
      )}
    </div>
  );
}

export default ToDoList;
