import React, {Component} from 'react';
import axios from '../../utils/axios';
import {Box, Button, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UserItem from './userItem';
import ResourceTemplateItem from "../resourceTemplate/resourceTemplateItem";

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

class UsersList extends Component {

    state = {
        users: []
    };

    getDeletedAccounts = () => {
        axios.get('/deleted_accounts').then(response => {
            let users = response.data;
            this.setState({users});
        })
    };
    goHome = () => {
        this.props.history.push("/home");
    }

    getAllAccounts=()=>{
        axios.get('/admin/user').then(response => {
            let users = response.data;
            this.setState({users});
        })
    }

    componentDidMount() {
        this.getDeletedAccounts();
        this.getAllAccounts();
    }


    render() {

        return (
            <Grid>
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
                                        startIcon={<ArrowBackIosIcon/>}
                                        onClick={this.goHome}
                                    >Go Back</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={this.getAllAccounts} >All accounts</Button>
                        <Button>Disable accounts</Button>
                        <Button onClick={this.getDeletedAccounts}>Deleted accounts</Button>
                    </ButtonGroup>
                    <Grid item xs={8}>
                        <div style={style}>
                            {this.state.users.map((item) =>
                                (<UserItem key={item}
                                                       item={item}/>)
                            )}
                        </div>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}


export default UsersList;