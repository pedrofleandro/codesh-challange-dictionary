import { useNavigate } from "react-router-dom";

const WordList = ({
  words,
}: {
  words: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const navigate = useNavigate();

  const handleSearch = (word: string) => {
    navigate(`/word/${word}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      {words.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {words.map((word, index) => (
            <li
              key={index} // Usamos o índice como chave, já que não há IDs
              className="p-4 text-black hover:text-blue-500 transition duration-200"
              onClick={() => handleSearch(word)}
            >
              {word} {/* Renderiza diretamente o texto da palavra */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Nenhuma palavra encontrada.</p>
      )}
    </div>
  );
};

export default WordList;
