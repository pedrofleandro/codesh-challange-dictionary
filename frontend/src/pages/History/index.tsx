import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useApi } from "../../hooks/useApi";

type HistoryItem = {
  term: string;
  accessedAt: string;
};

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApi();

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.fetchHistory()
      setHistory(response.history || []);
    } catch (err) {
      setError("Erro ao carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Histórico de Palavras</h1>

        {loading ? (
          <p className="text-gray-600 text-center">Carregando histórico...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : history.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhuma palavra acessada ainda.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">{item.term}</span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(item.accessedAt), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
