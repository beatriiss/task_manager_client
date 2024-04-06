import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
export const showFlashMessage = (message, type = "default") => {
  let backgroundColor;

  switch (type) {
    case "success":
        backgroundColor = "#442eb3";
      break;
    case "info":
      backgroundColor = "blue";
      break;
    case "warning":
        backgroundColor = "#f54d4c";
      break;
    case "danger":
        backgroundColor = "#f54d4c";
      break;
    default:
      backgroundColor = "#f54d4c";
      break;
  }

  showMessage({
    message: message,
    backgroundColor: backgroundColor, // Define a cor de fundo baseada no tipo de mensagem
    type: type,
    duration: 1800, // duração padrão da mensagem (em milissegundos)
    floating: true, 
    icon: type === "default" ? "auto" : type, 
    style:{marginTop:40, paddingHorizontal:40}
  });
};

export default showFlashMessage;
