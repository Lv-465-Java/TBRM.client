import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl, Container } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getUserRole } from '../../service/authService';
import axios from '../../utils/axios';
import Auth from '../../hoc/auth';

const formStyles = {
    marginBottom: 20,
};

const successMessage = "permission was successfully added";

class PermissionResourceTemplateAdd extends Component {

    state = {
        id: this.props.match.params.id,
        name: undefined,
        permission: "",
        principal: "",
        recipient: "",
        users: [],
        groups: [],
        open: false,
        successMessage: "",
        errorMessage: ""
    }

    save = () => {
        axios.post("/resource-template/permission", this.state).then(response => {
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
                    users: data
                })
            }).catch(error => {
                console.log(error.response.data);

            })
    }

    getGroups = () => {
        axios.get("/group").then(
            response => {
                let data = response.data;
                this.setState({
                    groups: data
                })
            }).catch(error => {
                console.log(error.response.data);

            })
    }


    onChangeRecipient = (event) => {
        let recipient = event.target.value;
        this.setState({ recipient });
    }

    handleChangePermission = permission => event => {
        this.setState({
            [permission]: event.target.value,
        });
    };

    handleChangePrincipal = principal => event => {
        this.setState({
            [principal]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    isValid = () => {
        return this.state.recipient !== ""
            && this.state.permission !== "" && this.state.principal !== "";
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
        this.getGroups();
    }


    render() {
        const usercolumns = [
            { title: 'Email', field: 'email' },
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Role', field: 'role.name' }
        ];
        const groupcolumns = [
            { title: 'Group', field: 'name' },
        ];
        return (
            <Auth>
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
                        <h1>Add/Update Permission to {this.state.name}</h1>
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Permission</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add permission to {this.state.name}, please enter recipient, choose permission and principal.
          </DialogContentText>
                                <Box mx={1}>
                                    <Box mt={3}
                                        display="flex"
                                        flexDirection="column">
                                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                        {this.state.successMessage && <Alert severity="success">{this.state.successMessage}</Alert>}
                                        <FormControl style={formStyles}>
                                            <TextField type="text" label="recipient" value={this.state.recipient} onChange={this.onChangeRecipient} />
                                        </FormControl>
                                        <FormControl style={formStyles}>
                                            <InputLabel htmlFor="permission">Permission</InputLabel>
                                            <Select
                                                native
                                                onChange={this.handleChangePermission('permission')}
                                                inputProps={{
                                                    name: 'permission',
                                                    id: 'permission',
                                                }}
                                            >
                                                <option value="" />
                                                <option value="read">READ</option>
                                                <option value="write">WRITE</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl style={formStyles}>
                                            <InputLabel htmlFor="principal">Principal</InputLabel>
                                            <Select
                                                native
                                                onChange={this.handleChangePrincipal('principal')}
                                                inputProps={{
                                                    name: 'principal',
                                                    id: 'principal',
                                                }}
                                            >
                                                <option value="" />
                                                <option value="true">User</option>
                                                <option value="false">Group</option>
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={!this.isValid()}
                                            onClick={this.save}
                                        >Add Permission</Button>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Container maxWidth="md">
                            <MaterialTable
                                title="Users"
                                columns={usercolumns}
                                data={this.state.users}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.email
                                            });
                                            this.handleClickOpen();
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
                    <Grid item xs={6}>
                        <Container maxWidth="md">
                            <MaterialTable
                                title="Groups"
                                columns={groupcolumns}
                                data={this.state.groups}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.name
                                            });
                                            this.handleClickOpen();
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

            </Auth>
        );
    }
}

export default PermissionResourceTemplateAdd;