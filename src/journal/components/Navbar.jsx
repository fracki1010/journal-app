import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"



export const Navbar = ({ drawerWidth = 240 }) => {
    return (

        <AppBar
            position="fixed"
            sx={{
                //Este es para calcular el ancho del 100% de la pantalla menos el drawerWidth 
                // Suponiendo que tenemos una pantalla pequeña
                width: `calc(100% - ${drawerWidth}px)`,
                // Ahora le estoy diciendo que solo en pantallas pequeñas
                // El ancho total de la pantalla sea el drawerWidth
                ml: { sm: `${drawerWidth}px` },
            }}
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    // Esto es para que se muestre solo en pantallas pequeñas
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Typography variant="h6" noWrap component='div' >JouralApp</Typography>

                    <IconButton color="error" >
                        <LogoutOutlined />

                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar>

    )
}
