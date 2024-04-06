import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showFlashMessage from "../components/message";
import { url } from "../config/url";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleUserData = async () => {
      const userdata = await AsyncStorage.getItem("user");

      setCurrentUser(userdata ? userdata : null);
    };
    handleUserData();
  }, []);

  const login = async ({ username, password }) => {
    // verifica se os campos estão preenchidos
    if (!username || !password) {
      console.log("Preencha os campos");
      showFlashMessage("Preeencha os campos!", "danger");
      return;
    }

    try {
      const response = await axios.post(
        `${url}user/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // salvar usuário localmente
        AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setCurrentUser(JSON.stringify(response.data.user));
        showFlashMessage("Usuário autênticado!", "success");
        
      } else {
        console.log("Usuário não encontrado");
        showFlashMessage("Usuário não encontrado!", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cadastro = async ({ username, email, password }) => {
    // verifica se os campos estão preenchidos
    if (!username || !email || !password) {
      showFlashMessage("Preeencha os campos!", "danger");
      return;
    }

    try {
      const response = await axios.post(
        `${url}user/cadastro`,
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        // salvar usuário localmente
        AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setCurrentUser(JSON.stringify(response.data.user));
        showFlashMessage("Usuário cadastrado e autênticado!", "success");
      } else {
        // exibir alerta se o status for diferente de 200 (cadastro falhou)
        showFlashMessage("Esse e-mail ja esta cadastrado!", "danger");
      }
    } catch (error) {
      console.log(error);
      showFlashMessage("Esse e-mail ja esta cadastrado!", "danger");
    }
  };

  const logout_context = async () => {
    setCurrentUser(null);
    AsyncStorage.removeItem("user");
    showFlashMessage("Log out efetuado!", "success");
  };

  const editar = async ({ Username, Email, Password, Id}) => {
    // Verifica se os campos estão preenchidos
    if (!Username || !Email || !Password) {
      showFlashMessage("Preeencha os campos!", "danger");
      return;
    }

    // Realiza a solicitação para editar o usuário
    axios
      .put(`${url}user/editar/${Id}`, {
        username: Username,
        email: Email,
        password: Password,
      })
      .then((response) => {
        // Se a solicitação for bem-sucedida, atualize a tela ou realize outras ações necessárias
        console.log(response.data.user); // exibe a mensagem do servidor
        AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setCurrentUser(JSON.stringify(response.data.user));
        showFlashMessage("Edição concluida!", "success");
        
      })
      .catch((error) => {
        // Se ocorrer algum erro na solicitação, exiba uma mensagem de erro
        console.error("Erro ao editar usuário:", error);
        showFlashMessage("Erro ao editar usuário!", "danger");
      });
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, cadastro, logout_context, editar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
