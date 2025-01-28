// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth/web-extension";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//Creando una nueva instancia de esta funcion
const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {

    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        
        //Con esto obtengo los datos del usuario
        const { displayName, email, photoURL, uid } = result.user;
        
        return{
            
            ok:true, //Esto quiere decir que todo salio bien con el try

            //User info
            displayName, email, photoURL, uid

        }


    } catch(error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        
        return {
            ok: false,
            errorMessage,
        }
    }
}



export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try{

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;



        // Con esto puedo saber cual es mi usuario actual 
        // * "FirebaseAuth.currenUser"
        //Y en la siguiente casilla hay que enviarle la actualizacion de user
        //Actualiza el user en la base de datos de Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    }catch (error) {
        return { ok: false, errorMessage: error.message}
        
    }
}


export const loginWithEmailPassword = async ({ email, password }) => {

    try{

        
        // signInWithEmailAndPassword
        //Esta funcion la llamo de Firebase/auth y sirbe para loguearse
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user

        return {
            ok: true,
            uid, photoURL, displayName,
        }
        
    }catch(error){
        return { ok: false, errorMessage: error.message }
    }
    
}


export const logoutFirebase = async () => {

    //Esto cierra google, cierra facebook, cierra twitter, osea que cierra todo
    return await FirebaseAuth.signOut();
} 