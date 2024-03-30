import "react-native-gesture-handler";
import Index from "./index"
import { AuthContextProvider } from "./context/auth_context";

export default function MyStack() {

  return (
    <AuthContextProvider>
        <Index/>
    </AuthContextProvider>
  );
}
