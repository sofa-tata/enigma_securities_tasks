import React from 'react';
import Draggable from 'react-draggable';
import { Box, Typography, Grid } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CloseIcon from '@material-ui/icons/Close';

class DailyVolume extends React.Component {
    constructor() {
        super()
        this.state = {
            widgetOpen: true
        }
    }

    closeWidget = () => {
        this.setState({ widgetOpen: false })
    }

    displayWidget = () => {
        if (this.state.widgetOpen) {
            return (
                <Draggable bounds="parent">
                    <Box
                        bgcolor="none"
                        color="common.white"
                        width={"20%"}
                        p={2}>

                        <Box display="flex" direction="row" alignItems="center" bgcolor="#262626">

                            <Box flexGrow={1} display="flex"
                                direction="row" alignItems="center"
                                justifyContent="space-between" bgcolor="common.black" px={2} pt={0.5}>
                                <FullscreenIcon />
                                <FiberManualRecordIcon color="secondary" fontSize="inherit" />
                                <Typography
                                    variant="subtitle2">
                                    Daily Volume
                            </Typography>

                            </Box>

                            <Box flexGrow={25} display="flex" direction="row" alignItems="center" justifyContent="flex-end">
                                <CloseIcon onClick={this.closeWidget} alignSelf="flex-end" />
                            </Box>

                        </Box>
                        <Box direction="row" alignItems="center" justifyContent="center" bgcolor="common.black" p={2} pl={2} >
                            <Typography
                                variant="h6"
                                color="secondary"
                                align="center"
                            >
                                $1,234,531.40
                            </Typography>
                        </Box>

                    </Box>
                </Draggable>
            )
        } else return null;
    }

    render() {
        return (
            <>
                {this.displayWidget()}
            </>
        )
    }
}

export default DailyVolume