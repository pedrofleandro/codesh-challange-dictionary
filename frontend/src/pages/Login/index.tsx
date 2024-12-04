import { useContext, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate()
  const [name, setName] = useState('');
 
  const [email, setEmail] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleNamelInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleCreateEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateEmail(event.target.value)
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleCreatePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatePassword(event.target.value)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email && password) {
      const isLogged = await auth.signin(email, password);
      if(isLogged) {
        navigate('/');
        toast.success('Login feito com sucesso!');
      }else{
        toast.error('Não foi possível logar!');
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if(createEmail && createPassword && name) {
      const register = await auth.register(createEmail, createPassword, name);
      if(register) {
        navigate('/');
        toast.success('Cadastro feito com sucesso!');
      }else{
        toast.error('Não foi possível logar!');
      }
    }else{
      toast.error('Preencha todos os campos!');
    }
  }

  return (
<div className="min-h-screen bg-[#1267fc] flex items-center justify-center p-4">
  <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
    <h1 className="text-3xl font-bold mb-6 text-center text-[#1267fc]">
      Bem-vindo ao Dictionary App
    </h1>

    <div className="grid gap-6">
      {/* Formulário de Login */}
      <form className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#1267fc]">
          Fazer Login
        </h2>
        
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={email}
            onChange={handleEmailInput}
            placeholder="Digite seu e-mail"
            className="p-3 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Digite sua senha"
            className="p-3 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 bg-[#1267fc] text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
        </div>
      </form>

      <hr className="border-gray-300" />

      {/* Formulário de Cadastro */}
      <form className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#1267fc]">
          Criar Conta
        </h2>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={handleNamelInput}
            placeholder="Digite seu nome"
            className="p-3 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
          />
          <input
            type="text"
            value={createEmail}
            onChange={handleCreateEmailInput}
            placeholder="Digite seu e-mail"
            className="p-3 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
          />
          <input
            type="password"
            value={createPassword}
            onChange={handleCreatePasswordInput}
            placeholder="Digite sua senha"
            className="p-3 rounded-md border border-gray-300 bg-gray-100 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-[#1267fc] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-3 bg-[#1267fc] text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}