import React, {Component} from "react";
import TableCell from "@material-ui/core/TableCell";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../utils/axios";
import Table from "@material-ui/core/Table";
import UserItem from "./userItem";
import TableContainer from "@material-ui/core/TableContainer";

class UserHistoryList extends Component {
    state = {
        user: this.props.item.users,
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
    render() {
        return (
            <Grid>
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
                        <TableContainer component={Paper}>
                            <Table>
                                {this.state.user.map((item) =>
                                    (<UserItem key={item}
                                               item={item}/>)
                                )}
                    </Table>
                </TableContainer>
            </Grid>
        )
    }
}

export default UserHistoryList;