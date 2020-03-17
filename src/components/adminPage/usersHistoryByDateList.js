import React, {Component} from "react";
import axios from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import UserItem from "./userItem";

class UsersHistoryByDateList extends Component {
    state = {
        user: this.props.users,
        date: undefined
    };

    handleDateChange = () => {
            let date = this.props.selectedDate;
            let url = `/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            axios.get(url).then(response => {
                let users = response.data;
                this.setState({user: users});
            })
    }

    componentDidMount() {
console.log("user hostory"+this.state.user)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("users = " + nextProps.users);
    //     return nextState.user != this.state.user;
    // }

    render() {
        return (
            <Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Avatar</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Last name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.user.map((item) =>
                                (<UserItem key={item}
                                           item={item}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        )
    }
}

export default UsersHistoryByDateList;