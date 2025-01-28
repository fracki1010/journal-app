import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}


export const startGoogleSignIn = () => {
    return async (dispatch) => {


        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        //Esto es por si el resultado no se encuentra, entonces
        //  el estado esta igual que al principio
        if (!result.ok) return dispatch(logout(result.errorMessage));


        //Si todo sale bien llamo al login
        dispatch(login(result))

    }
}

export const startCreationUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        //Esto me va a permitir bloquear el botton
        //va a poner el estatus en "checking"
        dispatch(checkingCredentials());

        //Estoo es de firebase/auth, y tiene una respuesta la cual estoy desectructurando
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        //Si esta funcion fallo muestra el error
        //El error es un objeto que tiene el string describiendolo dentro
        if (!ok) return dispatch(logout({ errorMessage }));

        //COn esto cambiamos el estado del authSlice
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}


export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {

        //Esto es para bloquear el boton
        dispatch(checkingCredentials());


        //Llama a la funcion que lo va a loguar en google firestore
        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password, })

        //Si esta funcion fallo muestra el error
        //El error es un objeto que tiene el string describiendolo dentro
        if (!ok) return dispatch(logout({ errorMessage }));

        //COn esto cambiamos el estado del authSlice
        dispatch(login({ uid, displayName, email, photoURL }));


    }

}


//*Con esta funcion nos deslogueamos
export const startLogout = () => {
    return async (dispatch) => {

        //Con esto cerramos sesion y lo sacamos de aca para tener
        //homogeneidad de todo
        await logoutFirebase();

        //llamando al logout que esta dentro del authSlice
        dispatch( logout() );

    }
}