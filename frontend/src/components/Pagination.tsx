const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-blue-500 rounded-md disabled:opacity-50 hover:bg-gray-400 text-blue-500 transition duration-300"
      >
        Anterior
      </button>
      <span className="font-semibold text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-blue-500 rounded-md disabled:opacity-50 hover:bg-gray-400 text-blue-500 transition duration-300"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
