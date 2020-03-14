import React, {Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "../../utils/axios";
import UserItem from "./userItem";
import CustomPagination from "../pagination/customPagination";
import {Grid} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

const  style={
    marginTop:40
}

const itemsNumber=5;

const paginationStyle = {
    padding: 20
};

class UserList extends Component {
    state = {
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
    };

    componentDidMount() {
         this.getAllAccounts(this.state.activePage);
    }


    getDeletedAccounts = () => {
        axios.get('/deleted_accounts').then(response => {
            let users = response.data;
            this.setState({users});
        })
    };

    getAllDisableUser= (pageNumber) => {
        axios.get(`/admin/users?status=false&page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let users = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                users: users,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            console.log(response.data);
        })
    };

    getNonApprovedUsers = (pageNumber) => {
        axios.get(`/users/role?role=guest&page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let users = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                users: users,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            console.log(response.data);
        })
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getData(pageNumber);
    };

    goBack = () => {
        this.props.history.goBack();
    };

    getAllAccounts = (pageNumber) => {
        axios.get(`/admin/user?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let users = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                users: users,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            console.log(response.data);
        })
    };


    render() {

        return (
            <Grid style={style}>
                <Grid xs={12}>
                <ButtonGroup color="primary" aria-label="small outlined button group">
                    <Button onClick={this.getAllAccounts}>All accounts</Button>
                    <Button onClick={()=>this.getAllDisableUser(this.state.activePage)}>Disable accounts</Button>
                    <Button onClick={this.getDeletedAccounts}>Deleted accounts</Button>
                    <Button onClick={()=>this.getNonApprovedUsers(this.state.activePage)}>Non approved users</Button>
                </ButtonGroup>
                </Grid>
                <TableContainer component={Paper} style={style}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">Avatar</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">First Name</StyledTableCell>
                                <StyledTableCell align="right">Last Name</StyledTableCell>
                                <StyledTableCell align="right">Phone</StyledTableCell>
                                <StyledTableCell align="right">Role</StyledTableCell>
                                <StyledTableCell align="right">Drop Role</StyledTableCell>
                                <StyledTableCell align="right">Enable/disable user</StyledTableCell>
                                <StyledTableCell align="right">Change role</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((item) => (

                                    <UserItem key={item}
                                              item={item}/>)
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

            <Grid container
        style={paginationStyle}
        justify="center">
            <CustomPagination
        activepage={this.state.activePage}
        totalPages={this.state.totalPages}
        itemsCountPerPage={this.state.itemsCountPerPage}
        totalItemsCount={this.state.totalItemsCount}
        onChange={this.handlePageChange}
        />
    </Grid>
            </Grid>
        );
    }
}

export default UserList;


