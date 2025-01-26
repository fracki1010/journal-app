import { registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}


export const startGoogleSignIn = () => {
    return async(dispatch) => {

        
        dispatch( checkingCredentials() );
    
        const result = await signInWithGoogle();

        //Esto es por si el resultado no se encuentra, entonces
        //  el estado esta igual que al principio
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );        


        //Si todo sale bien llamo al login
        dispatch( login( result ) )

    }
}

export const startCreationUserWithEmailPassword = ({ email, password, displayName }) => {

    return async ( dispatch ) => {

        //Esto me va a permitir bloquear el botton
        //va a poner el estatus en "checking"
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( {email, password, displayName} )
        
        //Si esta funcion fallo muestra el error
        //El error es un objeto que tiene el string describiendolo dentro
        if( !ok ) return dispatch( logout( {errorMessage} ) );

        //COn esto cambiamos el estado del authSlice
        dispatch( login({ uid, displayName, email, photoURL }) );
        

    }

}