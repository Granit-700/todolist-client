import { useSetFilter } from "../../../todoStore";
import "./TodoSearch.css";
import magnifierIcon from "../../../assets/icons/magnifier.svg";

const TodoSearch = () => {
  const setFilter = useSetFilter();

  return (
    <div className="TodoSearch">
      <input 
      type="text" 
      placeholder="Search task" 
      onChange={e => setFilter(e.target.value)}
      />
      <img src={magnifierIcon} alt="magnifier" />
    </div>
  );
};

export default TodoSearch;
