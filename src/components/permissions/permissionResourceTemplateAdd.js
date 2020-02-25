import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert';
import axios from '../../utils/axios';
import Auth from '../../hoc/auth';

const formStyles = {
    marginRight: 20,
    minWidth: 100
};


class PermissionResourceTemplateAdd extends Component {

    state = {
        id: this.props.match.params.id,
        name: undefined,
        permission: undefined,
        principal: undefined,
        recipient: undefined,
        errorMessage: ''
    }

    save = () => {
        axios.post("/resource-template/permission", this.state).then(response => {
            this.props.history.goBack();
        }, error => {
            this.setState({ errorMessage: error.response.data.message });
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

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount = () => {
        this.getData();
    }


    render() {
        return (
            <Auth>
            <Grid container spacing={3}>
                <Grid item xs={3}>
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
                <Grid item xs={6}>
                    <h1>Add/Update Permission to {this.state.name}</h1>
                    <Box mx="auto">
                        <Box mt={3}>
                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                            <FormControl style={formStyles}>
                                <TextField type="text" label="recipient" onChange={this.onChangeRecipient} />
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
                                onClick={this.save}
                            >Add Permission</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid></Grid>
            </Grid>
            </Auth>
        );
    }
}

export default PermissionResourceTemplateAdd;