
import { Navigate, Route, Routes } from 'react-router'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useCheckAuth } from '../hooks/useCheckAuth'


export const AppRouter = () => {


  //Con este custom hook podemos saber el estado de la authenticacion
  //de manera rapida y viendo si el usuario ya esta autendicado o no
  const { status } = useCheckAuth();



  if (status === 'checking') {
    return <CheckingAuth />
  }



  return (
    <Routes>

      {/* Las rutas solo van a existir si el usuario de fibase esta autendicado */}
      {
        (status === 'authenticated')
        //Si esta authenticado entra al JornalRoutes cualquier direccion
          ? <Route path='/*' element={<JournalRoutes />} />
          //Si no esta authenticado solo puede ver las direcciones de auth
          : <Route path='/auth/*' element={<AuthRoutes />} />

      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />


      {/* <Route path='/auth/*' element={ <AuthRoutes/> } />

        <Route path='/*' element={ <JournalRoutes/> } /> */}

    </Routes>
  )
}
