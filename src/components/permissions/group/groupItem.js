import React, {Component} from "react";
import axios from "../../../utils/axios";
import MaterialTable from "material-table";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import CustomPagination from "../../pagination/customPagination";

const columns = [
    {title: "First name", field: 'firstName', editable: 'never'},
    {title: "Last name", field: 'lastName', editable: 'never'},
    {title: "Email", field: 'email'}
];

const paginationStyle = {
    padding: 20
};

const itemsNumber = 5;

const noError = '';

class GroupItem extends Component {
    state = {
        name: this.props.match.params.name,
        id: 0,
        description: "",
        oldName: "",
        oldDescription: "",
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        errorMessage: "",
    };

    getData = () => {
        axios.get(`group/${this.state.name}`).then(response => {
            let data = response.data;
            this.setState({
                id: data.id,
                name: data.name,
                description: data.description,
                oldName: data.name,
                oldDescription: data.description,
                users: data.users,
            })
        })
    };


    goToUpdateData = () => {
        this.props.history.push(`/group/edit/${this.state.name}`);
    };

    goToAddPermission = () => {
        this.props.history.push(`/group/permission/${this.state.id}`);
    };

    goBack = () => {
        this.props.history.push(`/resource-template/permission/add/${this.state.id}`);
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getData(pageNumber)
    };

    handleDeleteItem = () => {
        return this.state.totalItemsCount % 5 === 0;
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIosIcon/>}
                                onClick={this.goBack}
                            >Go Back</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <h1>{this.state.name}</h1>
                    </Grid>
                    <Grid item xs={3}>
                        <Box mt={4}>
                            <p>{this.state.description}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box mt={3}>
                            <Button variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon/>}
                                    onClick={this.goToUpdateData}
                            >Edit</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box mt={3}>
                            <Button variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon/>}
                                    onClick={this.goToAddPermission}
                            >Edit Permissions</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <MaterialTable
                            title="Members"
                            columns={columns}
                            data={this.state.users}
                            editable={{
                                onRowAdd: newData => {
                                    axios.post("group/member", {
                                        email: newData.email,
                                        groupName: this.state.name
                                    }).then(response => {
                                    }, error => {
                                        this.setState({errorMessage: error.response.data.message})
                                    });
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData(this.state.activePage);
                                            resolve();
                                        }, 600);
                                    })
                                },
                                onRowDelete: oldData => {
                                    axios.delete("group/member", {
                                        data: {
                                            email: oldData.email,
                                            groupName: this.state.name
                                        }
                                    }).then(
                                        response => {
                                            this.setState({errorMessage: noError});
                                            if (this.handleDeleteItem()) {
                                                let newActivePage = (this.state.activePage - 1);
                                                this.setState({activePage: newActivePage})
                                            }
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        }
                                    );
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData(this.state.activePage);
                                            resolve();
                                        }, 600);
                                    })
                                }
                            }}
                            options={{
                                actionsColumnIndex: -1,
                                paging: false,
                                search: false
                            }}
                        />
                        <Grid container
                              style={paginationStyle}
                              justify="center">
                            <CustomPagination
                                activepage={this.state.activePage}
                                totalPages={this.state.totalPages}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                onChange={this.handlePageChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default GroupItem