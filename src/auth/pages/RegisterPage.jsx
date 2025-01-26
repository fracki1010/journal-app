import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

//Este es un alias que podemos colocarle al Link
import { Link as RouterLink } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreationUserWithEmailPassword } from "../../store/auth/thunks";


const formData = {
  email: '',
  password: '',
  displayName: ''
}

//Con esto vamos a validar los campos, para que se ingrese
const formValidations = {
  email: [(value)=> value.includes('@'),  'El correo debe tener una @'],
  password: [(value)=> value.length >= 6,  'El password debe de tener más de 6 letras'],
  displayName: [(value)=> value.length >= 1,  'El nombre es obligatorio'],
}

export const RegisterPage = () => {


  const dispatch = useDispatch();

  //Esto es para llamarlo cuando iniciamos el formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Esto es para manejar el error con msj predeterminado
  const { status, errorMessage } = useSelector(state => state.auth);


  //Con esto va a determinar si se esta checkeando el usuario para bloquear el boton de registro
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);


  const { formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid , emailValid, passwordValid,
   } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    
    //cambia a true diciendo que es valido
    setFormSubmitted(true);

    //si no es valido termina la accion
    if( !isFormValid ) return;

    //manda a llamar al thunks para iniciar con el signIn
    dispatch( startCreationUserWithEmailPassword(formState) )
  }

  return (

    <AuthLayout title="Crear una cuenta">

      <form onSubmit={onSubmit} >
        <Grid container>

          {/* nombre */}
          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label='Nombre completo'
              type="text"
              placeholder="Fernando Herrera"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              //Usar dos ! hace que se transforme en bool
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>



          {/* email */}
          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label='Correo'
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
               //Usar dos ! hace que se transforme en bool
               error={ !!emailValid && formSubmitted }
               helperText={ emailValid }
            />
          </Grid>

          {/* contraseña */}
          <Grid item='true' xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
               //Usar dos ! hace que se transforme en bool
               error={ !!passwordValid && formSubmitted }
               helperText={ passwordValid }
            />
          </Grid>



          {/* Botones */}
          <Grid container spacing={2} sx={{ mb: 1, mt: 1 }} >

            <Grid
             item
              xs={12}

              //Esto nos dice que si el errorMessage es false el display va a estar vacio
              //Y si es true va a ser none, los dos !! hacen que si algoo es null, se combierta
              //en false
              display={ !!errorMessage ? '' : 'none' }
              >
              <Alert severity="error" >{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={12} >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={ isCheckingAuthentication }
              >
                Crear cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }} >¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to='/auth/login'>
              ingresar
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>


  )
}

