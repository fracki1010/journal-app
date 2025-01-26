import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"

//Este es un alias que podemos colocarle al Link
import { Link as RouterLink } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";


export const LoginPage = () => {

  const { status } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'fernando@google.com',
    password: '123456',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });

    dispatch(checkingAuthentication(email, password))

  }


  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());

  }

  return (

    <AuthLayout title="Login">

      <form onSubmit={onSubmit}>
        <Grid container>

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

            />
          </Grid>



          {/* Botones */}
          <Grid container spacing={2} sx={{ mb: 1, mt: 1 }} >

            <Grid item xs={12} sm={6} >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} >
              <Button
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                <Google />

              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color="inherit" to='/auth/register'>

              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>


  )
}
