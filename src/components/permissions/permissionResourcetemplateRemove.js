import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { getUserRole } from '../../service/authService';
import axios from '../../utils/axios';

const formStyles = {
    marginBottom: 20,
    minWidth: 100
};

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

const successMessage = "permission was successfully deleted";

class PermissionResourceTemplateRemove extends Component {

    state = {
        id: this.props.match.params.id,
        name: undefined,
        permission: "",
        principal: "",
        recipient: "",
        permissions: [],
        successMessage: '',
        errorMessage: ''
    }

    delete = () => {
        axios.delete("/resource-template/permission", { data: this.state }).then(response => {
            this.setState({
                successMessage: successMessage,
                errorMessage: ""
            });
            this.getPermissions();
        }, error => {
            this.setState({
                errorMessage: error.response.data.message,
                successMessage: ""
            });
        })

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

    getPermissions = () => {
        axios.get(`/resource-template/permission/${this.state.id}`).then(response => {
            let permissions = response.data;
            this.setState({ permissions });
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

    choose = (data) => {
        this.setState({
            recipient: data.principal,
            permission: data.permission.toLowerCase()
        });
    }

    isValid = () => {
        return this.state.recipient !== ""
            && this.state.permission !== "" && this.state.principal !== "";
    }

    verifyUser = () => {
        if (getUserRole() !== "ROLE_MANAGER") {
            this.props.history.push("/home");
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        this.verifyUser();
        this.getData();
        this.getPermissions();
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
                    <Grid item xs={4}>
                        <h2>Delete Permission to {this.state.name}</h2>
                        <Box mx="auto">
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
                                        value={this.state.permission}
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
                                    color="secondary"
                                    size="large"
                                    disabled={!this.isValid()}
                                    onClick={this.delete}
                                >Delete Permission</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Users/Groups with access to {this.state.name}</h2>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Choose</StyledTableCell>
                                        <StyledTableCell>User/Group</StyledTableCell>
                                        <StyledTableCell>Permission</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.permissions.map(item => (
                                        <StyledTableRow key={item.principal + item.permission}>
                                            <StyledTableCell><AddIcon onClick={() => this.choose(item)} /></StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {item.principal}
                                            </StyledTableCell>
                                            <StyledTableCell>{item.permission}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PermissionResourceTemplateRemove;