import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";

const WordDetail: React.FC = () => {
  const { word } = useParams<{ word: string }>() as { word: string };
  const [wordData, setWordData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFavoriting, setIsFavoriting] = useState(false);
  const api = useApi();

  const fetchWordDetail = async () => {
    setLoading(true);
    try {
      const response = await api.fetchWord(word);
      setWordData(response[0]); // Pegamos apenas o primeiro item da lista
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    setIsFavoriting(true);
    setError("");
    try {
      const response = await api.favoriteWord(word);
      toast.success(response.message);
    } catch (err) {
      setError("Erro ao adicionar a palavra aos favoritos.");
    } finally {
      setIsFavoriting(false);
    }
  };

  useEffect(() => {
    console.log("Montagem do componente");
    if (word) {
      fetchWordDetail();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        {loading ? (
          <p className="text-gray-600 text-center">Carregando detalhes...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          wordData && (
            <div>
              <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Palavra: {wordData.word}
              </h1>
              <p className="text-gray-700 mb-4">
                <strong>Pronúncia:</strong> {wordData.phonetic}
              </p>
              <audio
                className="mb-4"
                controls
                src={wordData.phonetics[0]?.audio || ""}
              >
                Seu navegador não suporta áudio.
              </audio>
              <p className="text-gray-700 mb-4">
                <strong>Origem:</strong> {wordData.origin}
              </p>
              {wordData.meanings.map((meaning: any, index: number) => (
                <div key={index} className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {meaning.partOfSpeech}
                  </h2>
                  <ul className="list-disc list-inside">
                    {meaning.definitions.map(
                      (definition: any, defIndex: number) => (
                        <li key={defIndex} className="text-gray-700">
                          <p>
                            <strong>Definição:</strong> {definition.definition}
                          </p>
                          {definition.example && (
                            <p className="italic text-gray-600">
                              Exemplo: "{definition.example}"
                            </p>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
              <button
                onClick={handleAddToFavorites}
                disabled={isFavoriting}
                className={`w-full mt-4 px-4 py-2 rounded-md text-white font-bold ${
                  isFavoriting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isFavoriting ? "Adicionando..." : "Adicionar aos Favoritos"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WordDetail;
