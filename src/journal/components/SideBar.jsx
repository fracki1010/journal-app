import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);

  return (

    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

    <Drawer
        variant="permanent" // temporary
        open // esto significa que siempre estará abierto
        sx={{
             display: { xs: 'block' },
             '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
             }}
    >

             <Toolbar>
                <Typography variant="h6" noWrap component='div' >
                    { displayName }
                </Typography>
             </Toolbar>

             <Divider />

             <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
                        //Esto es para que no se muestre un padding
                        <ListItem key={text} disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>

                                <Grid>
                                    <ListItemText primary={text} />
                                    <ListItemText secondary={'Aliqua dolor incididunt anim mollit voluptate culpa ipsum sunt ipsum eiusmod.'} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
             </List>

    </Drawer>

    </Box>

)
}
