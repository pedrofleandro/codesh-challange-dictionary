import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();

  // Função para buscar os favoritos do usuário
  const fetchFavorites = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.fetchFavorites()
      console.log(response)
      setFavorites(response.favorites || []);
    } catch (err) {
      setError("Erro ao carregar favoritos.");
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar uma palavra dos favoritos
  const removeFavorite = async (word: string) => {
    try {
      const response = await api.removeFavorite(word)
      console.log(response);
      setFavorites((prevFavorites) => prevFavorites.filter((item) => item !== word));
      toast.success(`Palavra ${word} removida com sucesso!`);
    } catch (err) {
      setError(`Erro ao remover a palavra "${word}" dos favoritos.`);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Meus Favoritos</h1>

        {loading ? (
          <p className="text-gray-600 text-center">Carregando favoritos...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : favorites.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhuma palavra favorita ainda.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((word) => (
              <li
                key={word}
                className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center hover:bg-gray-100 transition"
              >
                <span className="text-lg font-medium text-gray-800">{word}</span>
                <button
                  onClick={() => removeFavorite(word)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
