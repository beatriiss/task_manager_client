import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const handleUserData = async () => {
      const userdata = await AsyncStorage.getItem('user');

      setCurrentUser(userdata? userdata : null);
    };
    handleUserData();
  }, []);

  const login = async ({ username, password}) => {
    // Verifica se os campos estão preenchidos
    if (!username || !password) {
      console.log("Preencha os campos")
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.102:3333/user/login', {
        username,
        password
      });

      if (response.status === 200) {
        // Salvar usuário localmente
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        setCurrentUser(JSON.stringify(response.data.user))

      } else {
        console.log("Usuário não encontrado")

      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleCadastro = async ({ username, email, password}) => {
    // Verifica se os campos estão preenchidos
    if (!username || !email || !password) {
      console.log("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.102:3333/user/cadastro', {
        username,
        email,
        password
      });

      if (response.status === 200) {
        // Salvar usuário localmente
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
       
      } else {
        // Exibir alerta se o status for diferente de 200 (cadastro falhou)
        console.log('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.log(error);
      console.log('Erro ao fazer cadastro. Por favor, tente novamente.');
    }
  };

  const logout_context = async () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const editar_context = async ({ dados, navigation }) => {
    // Lógica de edição do usuário
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, handleCadastro, logout_context, editar_context }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
};
