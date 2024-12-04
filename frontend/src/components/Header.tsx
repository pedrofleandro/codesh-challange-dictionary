import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth/AuthContext';

const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (auth.user) {
      if (Array.isArray(auth.user)) {
        if (auth.user[0] && 'username' in auth.user[0]) {
          setUserName(auth.user[0].username);
        } else {
          setUserName(undefined);
        }
      } else if (typeof auth.user === 'object' && 'username' in auth.user) {
        setUserName(auth.user.username);
      } else {
        setUserName(undefined);
      }
    } else {
      setUserName(undefined);
    }
  }, [auth.user]);

  const handleLogout = async () => {
    await auth.signout();
    navigate('/');
  };

  return (
    <header className="bg-[#1267fc] text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Home */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Dictionary App
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300"
            >
              Dicionário
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="hover:text-yellow-300 transition duration-300"
            >
              Histórico
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="hover:text-yellow-300 transition duration-300"
            >
              Favoritos
            </Link>
          </li>
        </ul>

        {/* User Greeting and Logout */}
        <div className="flex items-center space-x-4">
          <span className="text-yellow-200 font-semibold">
            {auth.user ? `Olá, ${userName}` : 'Bem-vindo'}
          </span>
          {auth.user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Sair
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
