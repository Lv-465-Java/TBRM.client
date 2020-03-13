import React, {Component} from "react";
import axios from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import UserItem from "./userItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {CardContent} from "@material-ui/core";
import UserHistoryList from "./userHistoryList";
import Card from "@material-ui/core/Card";

class UserProfile extends Component {
    state = {
        id: this.props.match.params.id,
        roleId: undefined,
        roleName: "",
        userHistory: []
    }

    getHistoryData = () => {
        axios.get(`/user/${this.state.id}`).then(response => {
            this.setState({userHistory: response.data});
            console.log(this.state.userHistory)
        })
    }
    componentDidMount = () => {
        this.getHistoryData()
    }

    setRole = (event) => {
        let roleName = event.target.value;
        let roleId = 1;
        switch (roleName) {
            case "ROLE_ADMIN":
                roleId = 1;
                break;
            case "ROLE_REGISTER":
                roleId = 2;
                break;
            case "ROLE_MANAGER":
                roleId = 3;
                break;
            case "ROLE_USER":
                roleId = 4;
                break;
            case "ROLE_GUEST":
                roleId = 5;
                break;

        }
        this.setState({roleId, roleName}, () => {
            axios.patch(`/admin/user/${this.state.id}`,
                 {
                    id: this.state.roleId,
                    name: this.state.roleName
                }
            ).then(response => {
                console.log(this.state.userHistory)
            })
        })

    }

    render() {
        return (
            <Grid>
                <h1>User History</h1>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Change role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.roleName}
                        onChange={this.setRole}
                    >
                        <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                        <MenuItem value={"ROLE_REGISTER"}>Register</MenuItem>
                        <MenuItem value={"ROLE_MANAGER"}>Manager</MenuItem>
                        <MenuItem value={"ROLE_USER"}>User</MenuItem>
                        <MenuItem value={"ROLE_GUEST"}>Guest</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper}
                    // component={Paper}
                                style={{weight: 600}}>
                    <Table>
                        {this.state.userHistory.map((item) =>
                            (<UserItem key={item}
                                       item={item}/>)
                        )}
                    </Table>
                </TableContainer>
            </Grid>
        )
    }
}

export default UserProfile;