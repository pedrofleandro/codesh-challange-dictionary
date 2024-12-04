import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import WordList from "../../components/WordList";
import Pagination from "../../components/Pagination";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appTitle, setAppTitle] = useState("");
  const [words, setWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    const fetchWords = async (page: number) => {
      try {
        const response = await api.fetchWords(page);
        setWords(response.results);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Erro ao buscar palavras:", error);
      }
    };

    fetchWords(currentPage);
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await api.fetchTitle();
        setAppTitle(response.message);
      } catch (error) {
        console.error("Erro ao buscar titúlo:", error);
      }
    }

    fetchTitle();
  }, [])
  

  const handleSearch = (word: string) => {
    setSearchTerm(word);
    setCurrentPage(1);
    navigate(`/word/${word}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-[#1267fc] text-center mb-8">
          {appTitle}
        </h1>
        <SearchBar onSearch={handleSearch} />
        <WordList 
          words={words} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
