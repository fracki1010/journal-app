import { Box, Toolbar } from "@mui/material"
import { SideBar, Navbar } from "../components";



const drawerWidth = 240;

export const JournalLayout = ({children}) => {
    return (
        <Box sx={{ display: 'flex' }}>

            <Navbar drawerWidth={ drawerWidth } />


            <SideBar drawerWidth={ drawerWidth } /> 

            <Box
                //Esto es para que simbolice que es el main
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >


                <Toolbar />

            {children}
            </Box>

        </Box>
    )
}
