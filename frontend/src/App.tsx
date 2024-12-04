import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/Home';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import { useContext } from 'react';
import { AuthContext } from './contexts/Auth/AuthContext';
import WordDetail from './pages/WordDetail';
import History from './pages/History';
import Favorites from './pages/Favorit';

function App() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="App">
        {auth.user && (
          <Header/>
        )}
        <main className="min-h-screen bg-gray-900 py-8 text-yellow-200">
          <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/word/:word" element={<RequireAuth><WordDetail /></RequireAuth>} />
            <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
            <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
          </Routes>
        </main>
        {auth.user && (
          <Footer/>
        )}
      </div>
    </>
  );
}

export default App;
