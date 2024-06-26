import { useContext } from "react"
import { AuthContext } from "../components/Authentication/Auth"

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth
