import React, {Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from "@material-ui/core";
import axios from "../../utils/axios";
import TenantItem from "./tenantItem";

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


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

class TenantList extends Component {
    state = {
        tenants: [],
    };

    getData = (pageNumber) => {
        axios.get(`tenant?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let tenants = response.data.content;
            this.setState({
                tenants: tenants,
            });
            console.log(response.data);
        })
    };

    createTenant = () => {
        this.props.history.push("/tenant/create");
    };

    render() {

        return (
            <div>
            <Button
                variant="contained"
                style={buttonStyle}
                onClick={this.createTenant}>Create Tenant</Button>
            <TableContainer component={Paper}>
                <Table aria-label="customized table" style={useStyles}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">URL</StyledTableCell>
                            <StyledTableCell align="right">Username</StyledTableCell>
                            <StyledTableCell align="right">Driver Class Name</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tenants.map((item) =>
                             (<TenantItem key={item}
                                                   item={item}/>)
                         )}
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        );
    }
}

export default TenantList;