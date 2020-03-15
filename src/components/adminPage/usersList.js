import React, {Component} from 'react';
import axios from '../../utils/axios';
import {Box, ButtonGroup, Button, Grid} from '@material-ui/core';
import UserItem from './userItem';
import List from "@material-ui/core/List";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import UserHistoryList from "./userHistoryList";

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
const itemsNumber = 5;

class UsersList extends Component {

    state = {
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        selectedDate: undefined
    };
    handleDateChange = date => {
        console.dir(date);
        this.setState({selectedDate: date}, ()=>{
            let date = this.state.selectedDate;
            let url = `/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            axios.get(url).then(response => {
                let users = response.data;
                this.setState({users:[]});
                this.setState({users:users});
            })
        })

    }

    getDeletedAccounts = () => {
        axios.get('/deleted_accounts').then(response => {
            let users = response.data;
            this.setState({users});
        })
    };

    getAllAccounts = (pageNumber) => {
        axios.get(`/admin/user?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let users = response.data.content;
            let totalPages = response.data.totalPages;
            this.setState({users});
        })
    }
    getAllHistory = () => {
        axios.get(`/all_history`).then(response => {
            let users = response.data;
            this.setState({users});
        })
    }

    componentDidMount() {
        // this.getDeletedAccounts();
        // this.getAllAccounts();
    }

    render() {
        const userColumns = [
            {title: 'Avatar', field: 'imageUrl'},
            {title: 'Email', field: 'email'},
            {title: 'First Name', field: 'firstName'},
            {title: 'Last Name', field: 'lastName'},
            {title: 'Phone', field: 'phone'},
            {title: 'revtype', field: 'revtype'},
            {title: 'Time', field: 'time'},
            // {title: 'Role', field: 'role.name'}
        ];
        return (
            <Grid container>
                <Grid  spacing={3} xs={12} style={gridStyle} alignContent={"center"}>
                    <ButtonGroup color="primary" aria-label="small outlined button group">
                        <Button onClick={this.getAllAccounts}>All accounts</Button>
                        <Button>Disable accounts</Button>
                        <Button onClick={this.getDeletedAccounts}>Deleted accounts</Button>
                        <Button onClick={this.getAllHistory}>All history</Button>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    disableFuture
                                    autoOk
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="choose history by date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={11}>
                    <TableContainer component={Paper}>
                        <Table >
                            {this.state.users.map((item) =>
                                (<UserItem key={item}
                                           item={item}/>)
                            )}
                        </Table>
                    </TableContainer>

                </Grid>
                <Grid item xs={1}/>
            </Grid>

        )
    }
}


export default UsersList;