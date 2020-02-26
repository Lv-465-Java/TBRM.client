import React, {Component} from "react";
import axios from '../../utils/axios';
import MaterialTable from "material-table";
import {Box, Button, Grid} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";

const columns = [
    {title: 'Name', field: 'name'},
    {title: 'Description', field: 'description'},
];

const gridStale = {
    marginBottom: 20
};

const noError = '';

class GroupList extends Component {
    state = {
        groups: [],
        errorMessage: "",
    };

    getData = () => {
        axios.get("group").then(response => {
            let groups = response.data;
            this.setState({groups});
        });
        this.state.groups.reverse();
    };

    componentDidMount() {
        this.getData();
    }

    goToEditGroup(name) {
        this.props.history.push(`/group/view/${name}`);
    }

    goBack = () => {
        this.props.history.push("/home");
    };

    render() {
        return (
            <div>
                <Grid container spacing={3} style={gridStale}>
                    <Grid item xs={2}>
                        <Box mx="auto">
                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIosIcon/>}
                                    onClick={this.goBack}
                                >Go Back</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <MaterialTable
                    title="Groups"
                    columns={columns}
                    data={this.state.groups}
                    actions={[
                        {
                            icon: 'visibility',
                            tooltip: 'View Group',
                            onClick: (event, data) => {
                                this.goToEditGroup(data.name);
                            }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData => {
                            axios.post("group", newData).then(response => {
                                this.setState({errorMessage: noError});
                                this.props.history.push("/group");
                            }, error => {
                                this.setState({errorMessage: error.response.data.message});
                            });
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    this.getData();
                                    resolve();
                                }, 600);
                            })
                        },
                        onRowDelete: oldData => {
                            axios.delete(`group/${oldData.name}`).then(
                                response => {
                                    this.setState({errorMessage: noError})
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
            </div>
        )
    }
}

export default GroupList;