import React from 'react';
import TradesList from './TradesList';
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';



class MainPage extends React.Component {

    render() {

        const theme = createMuiTheme({
            typography: {
                fontWeight: 100,
                subtitle1: {
                    fontSize: 18
                },
                h6: {
                    fontSize: '1.5rem'
                }
            },
            palette: {
                type: "dark",                
                common: {
                    black: "#323232",
                    white: "#ffffff"
                },
                primary: {
                    main: "#0396E5"
                },
                secondary: {
                    main: "#2DC056"
                }, 
                success: {
                    main: "#4caf50"
                },
                error: {
                    main: "#FF0122"
                },
                warning: {
                    main: "#ffb300"
                },
                grey: {
                    100: "#1A1A1A" 
                },
                text: {
                    primary: "#ffffff",
                    secondary: "ffb300"
                }
            },
            spacing: 8
        })

        return (
            <ThemeProvider theme={theme}>
                <Box bgcolor="grey.100"
                width={'100vw'}
                height={'100vh'}
                style={{overflow: "hidden"}}
                display='flex'
                justifyContent='center'
                >                    
                    <TradesList />

                </Box>

            </ThemeProvider>            
        )
    }
}

export default MainPage