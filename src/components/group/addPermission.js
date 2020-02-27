import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";
import axios from "../../utils/axios";
import MaterialTable from "material-table";


const columns = [
    {title: "Email", field: 'principal'}
];

const noError = '';

class AddPermission extends Component {
    state = {
        id: this.props.match.params.id,
        recipient: "",
        users: [],
        errorMessage: "",
    };

    getData = () => {
        axios.get(`/group/permission/${this.state.id}`).then(
            response => {
                let users = response.data;
                this.setState({users})
            },
            error => {
                this.setState({errorMessage: error.response.data.message});
            })
    };

    componentDidMount() {
        this.getData();
    }

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Box mx="auto">
                        <Box mt={1}>
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIosIcon/>}
                                onClick={this.goBack}
                            >Go Back</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <h1>Permissions</h1>
                    <Box mt={1}>
                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                        <MaterialTable
                            title="Users"
                            columns={columns}
                            data={this.state.users}
                            editable={{
                                onRowAdd: newData => {
                                    axios.post(`/group/permission`, {
                                        id: this.state.id,
                                        recipient: newData.principal
                                    }).then(
                                        response => {
                                            this.setState({errorMessage: noError})
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        })
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData();
                                            resolve();
                                        }, 600);
                                    })
                                },
                                onRowDelete: oldData => {
                                    axios.delete("group/permission", {
                                        data: {
                                            id: this.state.id,
                                            recipient: oldData.principal
                                        }
                                    }).then(
                                        response => {
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        }
                                    );
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData();
                                            resolve();
                                        }, 600);
                                    })
                                }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

export default AddPermission;