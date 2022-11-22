import { SearchIcon } from "react-line-awesome";

function SearchBar(props) {
  return (
    <div className="searchbar">
      <SearchIcon />
      {/* <input placeholder={props.placeholder} onChange={(e)=>props.searchData(e.target.value)} /> */}
      <input placeholder={props.placeholder} onChange={(e) => e.target.value} />
    </div>
  );
}

export default SearchBar;
