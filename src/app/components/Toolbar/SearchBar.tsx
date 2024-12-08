import { FunctionComponent } from "react";

interface SearchBarProps {
  onClick?: () => void;
}
const SearchBar: FunctionComponent<SearchBarProps> = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-full h-full md:h-10 px-4 border border-gray-300 rounded-md  text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-lg"
    />
  );
};

export default SearchBar;
