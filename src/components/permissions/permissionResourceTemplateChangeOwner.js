import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert';
import axios from '../../utils/axios';
import Auth from '../../hoc/auth';

const formStyles = {
    marginRight: 20,
    minWidth: 100
};


class PermissionResourceTemplateChangeOwner extends Component {

    state = {
        id: this.props.match.params.id,
        name: undefined,
        recipient: undefined,
        errorMessage: ''
    }

    changeOwner = () => {
        axios.post("/resource-template/permission/owner", this.state).then(response => {
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

    componentDidMount = () => {
        this.getData();
    }

    goBack = () => {
        this.props.history.goBack();
    }


    render() {
        return (
            <Auth>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
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
                        <h1>Change Owner to {this.state.name}</h1>
                        <Box mx="auto">
                            <Box mt={3}>
                                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                <FormControl style={formStyles}>
                                    <TextField type="text" label="recipient" onChange={this.onChangeRecipient} />
                                </FormControl>
                                <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={this.changeOwner}
                                >Change Owner</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Auth>
        );
    }
}

export default PermissionResourceTemplateChangeOwner;