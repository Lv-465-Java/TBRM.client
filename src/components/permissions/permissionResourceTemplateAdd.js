import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from '../../utils/axios';
import { makeStyles } from '@material-ui/core/styles';

const formStyles = {
    marginRight: 20,
    minWidth: 100
};


class PermissionResourceTemplateAdd extends Component {

    state = {
        permission: undefined,
        principal: undefined,
        recipient: undefined
    }

    create = () => {
        axios.post("/resource-template", this.state).then(response => {
            this.props.history.push("/resource-template");
        }, error => {

        })
    }


    onChangeDescription = (event) => {
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


    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <h1>Add Permission to Resource Template</h1>
                    <Box mx="auto">
                        <Box mt={3}>
                                <FormControl style={formStyles}>
                                    <TextField type="text" label="recipient" />
                                </FormControl>
                                <FormControl style={formStyles}>
                                    <InputLabel htmlFor="permission">Permission</InputLabel>
                                    <Select
                                        native
                                        value={this.state.principal}
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
                                        value={this.state.principal}
                                        onChange={this.handleChangePrincipal('principal')}
                                        inputProps={{
                                            name: 'principal',
                                            id: 'principal',
                                        }}
                                    >
                                        <option value="" />
                                        <option value={true}>User</option>
                                        <option value={false}>Group</option>
                                    </Select>
                                </FormControl>
                                <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={this.create}
                                >Add Permission</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid></Grid>
            </Grid>
        );
    }
}

export default PermissionResourceTemplateAdd;