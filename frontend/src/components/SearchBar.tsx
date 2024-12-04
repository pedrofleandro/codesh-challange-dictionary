import { useState } from "react";

interface SearchBarProps {
  onSearch: (word: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar palavras..."
        className="p-3 border text-black border-gray-300 rounded-md w-full focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-[#1267fc] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
