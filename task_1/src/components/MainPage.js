import React from 'react';
import DailyVolume from './DailyVolume';
import TradesWidget from './TradesWidget';
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';


class MainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            time: Date.now()
        }
    }

    render() {

        const theme = createMuiTheme({
            typography: {
                fontWeight: 100,
                subtitle1: {
                    fontSize: 18
                },
                h6: {
                    fontSize: '1.5rem'
                },
                h5: {
                    fontSize: '1.2rem'
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
                    >  
                        <Box 
                        display='flex'
                        width={'100vw'}
                        height={'7%'}
                        bgcolor='common.black'
                        direction='row'
                        color='common.white'
                        alignItems='center'
                        justifyContent='flex-start'>
                            <FingerprintIcon fontSize="large" style={{marginLeft: '1%'}}/>
                            <Typography variant="h5" 
                            ml={2}
                            style={{marginLeft: '1%'}}
                            >
                                Dashboard
                            </Typography>
                        </Box>                        
                        <TradesWidget />
                        <DailyVolume />
                        
                    </Box>

            </ThemeProvider>            
        )
    }
}

export default MainPage