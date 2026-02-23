import { useSetFilter } from "../../../todoStore";
import "./TodoSearch.css";

const TodoSearch = () => {
  const setFilter = useSetFilter();

  return (
    <div className="TodoSearch">
      <input 
      type="text" 
      placeholder="Search task" 
      onChange={e => setFilter(e.target.value)}
      />
      <img src="src/assets/icons/magnifier.svg" alt="magnifier" />
    </div>
  );
};

export default TodoSearch;
