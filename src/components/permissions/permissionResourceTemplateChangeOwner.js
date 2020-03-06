import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl, Container } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { getUserRole } from '../../service/authService';
import axios from '../../utils/axios';
import Auth from '../../hoc/auth';

const formStyles = {
    marginBottom: 30
};

const columns = [
    { title: 'Email', field: 'email' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Role', field: 'role.name' }
];

const successMessage = "owner was successfully changed";

class PermissionResourceTemplateChangeOwner extends Component {

    state = {
        id: this.props.match.params.id,
        name: undefined,
        recipient: "",
        data: [],
        successMessage: "",
        errorMessage: ''
    }

    changeOwner = () => {
        axios.post("/resource-template/permission/owner", this.state).then(response => {
            this.setState({ 
                successMessage: successMessage,
                errorMessage: ""
            });
        }, error => {
            this.setState({ 
                errorMessage: error.response.data.message,
                successMessage: ""
             });
        })
        console.log(this.state);
    }

    getData = () => {
        axios.get(`/resource-template/${this.state.id}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name
                })
            }).catch(error => {
                console.dir(error.response.data);

            })

    }

    getUsers = () => {
        axios.get("/user").then(
            response => {
                let data = response.data;
                console.log(data);
                this.setState({
                    data: data
                })
            }).catch(error => {
                console.dir(error.response.data);

            })

    }


    onChangeRecipient = (event) => {
        let recipient = event.target.value;
        this.setState({ recipient });
    }

    isValid = () => {
        return this.state.recipient !== "";
    }

    verifyUser = () => {
        if(getUserRole() !== "ROLE_MANAGER"){
            this.props.history.push("/home");
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        this.verifyUser();
        this.getData();
        this.getUsers();
    }


    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Box mx="auto">
                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIosIcon />}
                                    onClick={this.goBack}
                                >Go Back</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <h1>Change Owner to {this.state.name}</h1>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Box mx={7}>
                            <Box mt={5}
                                display="flex"
                                flexDirection="column">
                                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                {this.state.successMessage && <Alert severity="success">{this.state.successMessage}</Alert>}
                                <FormControl style={formStyles}>
                                    <TextField type="text" label="recipient" value={this.state.recipient} onChange={this.onChangeRecipient} />
                                </FormControl>
                                <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={!this.isValid()}
                                    onClick={this.changeOwner}
                                >Change Owner</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Container maxWidth="md">
                            <MaterialTable
                                title="Users"
                                columns={columns}
                                data={this.state.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.email
                                            });
                                        }
                                    }
                                ]}
                                editable={{
                                    onRow: (newData, oldData) =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                                resolve();
                                                if (oldData) {
                                                    this.setState(prevState => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });
                                                }
                                            }, 600);
                                        }),
                                }}
                            />
                        </Container>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default PermissionResourceTemplateChangeOwner;