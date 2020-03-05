import React, {Component} from "react";
import axios from '../../utils/axios';
import MaterialTable from "material-table";
import {Box, Button, Grid} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";
import CustomPagination from "./customPagination";


const columns = [
    {title: 'Name', field: 'name'},
    {title: 'Description', field: 'description'},
];

const gridStale = {
    marginBottom: 20
};

const paginationStyle = {
    padding: 20
};

const itemsNumber = 5;

const noError = '';

class GroupList extends Component {
    state = {
        groups: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        errorMessage: "",
    };


    getData = (pageNumber) => {
        axios.get(`group?page=${pageNumber}&size=${itemsNumber}`).then(response => {
            let groups = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                groups: groups,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
        });
    };

    componentDidMount() {
        this.getData(this.state.activePage);
    }

    goToEditGroup(name) {
        this.props.history.push(`/group/view/${name}`);
    }

    goBack = () => {
        this.props.history.push("/home");
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getData(pageNumber)
    };

    handleDeleteItem = () => {
        return this.state.totalItemsCount % 5 === 0;
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
                            }, error => {
                                this.setState({errorMessage: error.response.data.message});
                            });
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    this.getData(this.state.activePage);
                                    resolve();
                                }, 600);
                            })
                        },
                        onRowDelete: oldData => {
                            axios.delete(`group/${oldData.name}`).then(
                                response => {
                                    this.setState({errorMessage: noError,
                                        totalItemsCount: (this.state.totalItemsCount - 1)});
                                    if(this.handleDeleteItem()) {
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
            </div>
        )
    }
}

export default GroupList;