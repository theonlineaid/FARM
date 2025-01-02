
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

type ListSummary = {
  id: number;
  name: string;
  item_count: number;
};

type ListToDoListsProps = {
  listSummaries: ListSummary[] | null;
  handleSelectList: (id: number) => void;
  handleNewToDoList: (name: string) => void;
  handleDeleteToDoList: (id: number) => void;
};

function ListToDoLists({
  listSummaries,
  handleSelectList,
  handleNewToDoList,
  handleDeleteToDoList,
}: ListToDoListsProps) {
  const labelRef = useRef<HTMLInputElement>(null);

  // if (!listSummaries === null) {
  //   return <div className="ListToDoLists loading">Loading to-do lists ...</div>;
  // } else if (listSummaries.length === 0) {
  //   return (
  //     <div className="ListToDoLists">
  //       <div className="box">
  //         <label>
  //           New To-Do List:&nbsp;
  //           <input ref={labelRef} type="text" />
  //         </label>
  //         <button
  //           onClick={() => {
  //             if (labelRef.current) {
  //               handleNewToDoList(labelRef.current.value);
  //               labelRef.current.value = "";
  //             }
  //           }}
  //         >
  //           New
  //         </button>
  //       </div>
  //       <p>There are no to-do lists!</p>
  //     </div>
  //   );
  // }
  return (
    <div className="ListToDoLists">
      <h1>All To-Do Lists</h1>
      <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input ref={labelRef} type="text" />
        </label>
        <button
          onClick={() => {
            if (labelRef.current) {
              handleNewToDoList(labelRef.current.value);
              labelRef.current.value = "";
            }
          }}
        >
          New
        </button>
      </div>
      {listSummaries?.map((summary) => {
        return (
          <div
            key={summary.id}
            className="summary"
            onClick={() => handleSelectList(summary.id)}
          >
            <span className="name">{summary.name} </span>
            <span className="count">({summary.item_count} items)</span>
            <span className="flex"></span>
            <span
              className="trash"
              onClick={(evt) => {
                evt.stopPropagation();
                handleDeleteToDoList(summary.id);
              }}
            >
              <BiSolidTrash />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ListToDoLists;
