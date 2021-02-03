import React from 'react';
import Draggable from 'react-draggable';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
Paper, TablePagination, withStyles } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CloseIcon from '@material-ui/icons/Close';

const NUM_OF_RATES_ON_PAGE = 4;

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
        padding:'8px'
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
        const rates = require('../rates_test.json')
        this.setState({
            ratesList: rates
        })
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
        this.setState({pageNumber: number});
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
                style={{backgroundColor: '#323232'}}   
            />  
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">
                                    <Typography variant="subtitle2">
                                        Trade Date
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
                                            fontSize="inherit"/> :
                                            <FiberManualRecordIcon
                                            color="error"
                                            fontSize="inherit"/>
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
                <Draggable bounds="parent">
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
                                    <FiberManualRecordIcon  color="secondary" fontSize="inherit" />
                                    <Typography 
                                    variant="subtitle2">
                                        Trades
                                    </Typography>

                                </Box>

                                <Box flexGrow={25} display="flex" direction="row" alignItems="center" justifyContent="flex-end">
                                    <CloseIcon onClick={this.closeWidget} alignSelf="flex-end"/>
                                </Box>

                            </Box>

                            <Box>
                                {this.showRates()}
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

export default TradesWidget