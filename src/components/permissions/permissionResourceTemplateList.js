import React, { Component } from 'react';
import axios from '../../utils/axios';
import { Button, Grid, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const style = {

    display: "flex",
    flexWrap: "wrap",
}

const gridStyle = {
    marginTop: 40
}
const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff'
}

class PermissionResourceTemplateList extends Component {

    state = {
        id: this.props.match.params.id,
        permissions: []
    }

    getData = () => {
        axios.get(`/resource-template/permission/${this.state.id}`).then(response => {
            let permissions = response.data;
            this.setState({ permissions });
        })
    }

    componentDidMount() {
        this.getData();
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Grid container spacing={3} style={gridStyle}>
                    <Grid item xs>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Box mx="auto">
                                <Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<ArrowBackIosIcon />}
                                        onClick={this.goBack}
                                    >Go Back</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>User/Group</StyledTableCell>
                                        <StyledTableCell>Permission</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.permissions.map(item => (
                                        <StyledTableRow key={item.principal}>
                                            <StyledTableCell component="th" scope="row">
                                                {item.principal}
                                            </StyledTableCell>
                                            <StyledTableCell>{item.permission}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs>

                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default PermissionResourceTemplateList;