import { useContext } from "react"
import { ErrorContext } from "../context/ErrorContext"


const useError = () =>{
    return useContext(ErrorContext);
}

export default useError;