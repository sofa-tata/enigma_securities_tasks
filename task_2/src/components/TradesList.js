import React from 'react';
import {
    Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    Paper, TablePagination, withStyles
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CloseIcon from '@material-ui/icons/Close';

const NUM_OF_RATES_ON_PAGE = 7;
const rates = require('../rates_test.json')

const io = require('socket.io-client');
// const socket = io('https://wss3.live-rates.com/', {transports: ['websocket']});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#000000",
        color: theme.palette.common.white,
        padding: '10px'
    },
    body: {
        fontSize: 14,
        padding: '10px',
        borderBottom: 'none'
    },
}))(TableCell);

const YellowStyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
        padding: '8px',
        color: '#ffb300',
        borderBottom: 'none'
    },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: '#000000',
        padding: '8px'
    },
}))(TableRow);


class TradesWidget extends React.Component {
    constructor() {
        super()
        this.state = {
            widgetOpen: true,
            pageNumber: 0,
            ratesList: []
        }
    }

    componentDidMount = () => {

        ////////////////SIMULATION//////////////////
        this.setState({ ratesList: rates })

        //////////////////SOCKET///////////////////////
        // var key = 'trial'

        // socket.on('connect', function () {
        //     socket.emit('key', key);
        // })

        // socket.on('rates', (msg) => this.addRate(msg))
    }

    addRate = (msg) => {
        console.log("msg: " + msg)
        const msgObjected = JSON.parse(msg)
        console.log('msgObjected', msgObjected)
        if (!("info" in msgObjected)) {
            console.log('you are in if, msgObj: ', msgObjected)
            this.setState({ ratesList: [msgObjected, ...this.state.ratesList] })
            console.log('listOfRates', this.state.ratesList)
        }
    }

    makeDate = (timestamp) => {
        const milliseconds = timestamp - 1000
        const dateObj = new Date(milliseconds);
        console.log('date', dateObj.toLocaleString())
        return dateObj.toLocaleString();
    }

    closeWidget = () => {
        this.setState({ widgetOpen: false })
    }

    changePageNumber = (event, number) => {
        this.setState({ pageNumber: number });
    }

    showRates = () => {
        const { pageNumber, ratesList } = this.state
        console.log('pageNumber', pageNumber)
        return (
            <Paper>

                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={ratesList.length}
                    rowsPerPage={NUM_OF_RATES_ON_PAGE}
                    page={pageNumber}
                    onChangePage={this.changePageNumber}
                    style={{ backgroundColor: '#323232' }}
                />
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                <Typography variant="subtitle2">
                                    Date
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <Typography variant="subtitle2" color="text.secondary">
                                    Currency
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Bid
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Ask
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    High
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Low
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Open
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Close
                                    </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Typography variant="subtitle2">
                                    Status
                                    </Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            ratesList.slice(pageNumber * NUM_OF_RATES_ON_PAGE, pageNumber * NUM_OF_RATES_ON_PAGE + NUM_OF_RATES_ON_PAGE)
                                .map((rate, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{this.makeDate(rate.timestamp)}</StyledTableCell>
                                            <YellowStyledTableCell align="center">
                                                <Typography variant="subtitle2">
                                                    {rate.currency}
                                                </Typography>
                                            </YellowStyledTableCell>
                                            <StyledTableCell align="right">{rate.bid}</StyledTableCell>
                                            <StyledTableCell align="right">{rate.ask}</StyledTableCell>
                                            <StyledTableCell align="right">{rate.low}</StyledTableCell>
                                            <StyledTableCell align="right">{rate.high}</StyledTableCell>
                                            <StyledTableCell align="right">{rate.open}</StyledTableCell>
                                            <StyledTableCell align="right">{rate.close}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {rate.close > rate.open ?
                                                    <FiberManualRecordIcon
                                                        color="secondary"
                                                        fontSize="inherit" /> :
                                                    <FiberManualRecordIcon
                                                        color="error"
                                                        fontSize="inherit" />
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }


    displayWidget = () => {
        if (this.state.widgetOpen) {
            return (

                <Box
                    bgcolor="none"
                    color="common.white"
                    width={"55%"}
                    p={2}>

                    <Box display="flex" direction="row" alignItems="center" bgcolor="#262626">

                        <Box flexGrow={1} display="flex"
                            direction="row" alignItems="center"
                            justifyContent="space-between" bgcolor="common.black" px={2} pt={0.5}>
                            <FullscreenIcon />
                            <FiberManualRecordIcon color="secondary" fontSize="inherit" />
                            <Typography
                                variant="subtitle2">
                                Rates
                                    </Typography>

                        </Box>

                        <Box flexGrow={25} display="flex" direction="row" alignItems="center" justifyContent="flex-end">
                            <CloseIcon onClick={this.closeWidget} alignSelf="flex-end" />
                        </Box>

                    </Box>

                    <Box>
                        {this.showRates()}
                    </Box>

                </Box>
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

export default TradesWidget