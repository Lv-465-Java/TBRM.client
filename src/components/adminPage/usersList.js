import React, {Component} from 'react';
import axios from '../../utils/axios';
import {ButtonGroup, Button, Grid} from '@material-ui/core';
import UserItem from './userItem';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import UsersHistoryList from "./usersHistoryList";

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
        deletedUsers: [],
        allUsers: undefined,
        selectedDate: undefined
    };

    getDeletedAccounts = () => {
        axios.get('/deleted_accounts').then(response => {
            let deletedUsers = response.data;
            this.setState({deletedUsers});
        })
    };


    getAllHistory = () => {
        axios.get(`/all_history`).then(response => {
            let allUsers = response.data;
            this.setState({allUsers});
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
                <Grid spacing={3} xs={12} style={gridStyle} alignContent={"center"}>
                    <ButtonGroup color="primary" aria-label="small outlined button group">
                        <Button onClick={this.getAllAccounts}>All accounts</Button>
                        <Button>Disable accounts</Button>
                        <Button onClick={this.getDeletedAccounts}>Deleted accounts</Button>
                        <Button onClick={this.getAllHistory}>All history</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    {this.state.allUsers!==undefined &&
                    <UsersHistoryList allUsers={this.state.allUsers} />}
                    <TableContainer component={Paper}>
                        <Table>
                            {/*{this.state.allUsers.map((item) =>*/}
                            {/*    (<UserItem key={item}*/}
                            {/*               item={item}/>)*/}
                            {/*)}*/}
                            {this.state.deletedUsers.map((item) =>
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