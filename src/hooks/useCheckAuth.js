import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";



export const useCheckAuth = () => {
    //Curstom hook creado

    //Con esto traemos los datos que estan en authSlice
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user
            dispatch(login({ uid, email, displayName, photoURL }));

        });

    }, []);

    return {
        status
    }


}


