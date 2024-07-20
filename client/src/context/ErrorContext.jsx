import { createContext, useState } from "react";


export const ErrorContext = createContext();

export const ErrorProvider  = ({children}) => {
    const [error, setError] = useState(null);

    const showError = (message) =>{
        setError(message);
        setTimeout(() =>{
            setError(null)
        }, 5000)
    };

    return(
        <ErrorContext.Provider value={{error,showError}}>
            {children}
        </ErrorContext.Provider>
    )
}