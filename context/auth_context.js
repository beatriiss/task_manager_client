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
    // verifica se os campos estão preenchidos
    if (!username || !password) {
      console.log("Preencha os campos")
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.112:3333/user/login', {
        username,
        password
      });

      if (response.status === 200) {
        // salvar usuário localmente
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        setCurrentUser(JSON.stringify(response.data.user))

      } else {
        console.log("Usuário não encontrado")

      }
    } catch (error) {
      console.log(error);

    }
  };

  const cadastro = async ({ username, email, password}) => {

    // verifica se os campos estão preenchidos
    if (!username || !email || !password) {
      console.log("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.112:3333/user/cadastro', {
        username,
        email,
        password
      });

      if (response.status === 200) {
        // salvar usuário localmente
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
       
      } else {
        // exibir alerta se o status for diferente de 200 (cadastro falhou)
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
    // lógica de edição do usuário
    // ainda não implementado
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, cadastro, logout_context, editar_context }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
};
