import React, { Component } from 'react';
import axios from "../../utils/axios";
import ResourceRecordList from "./ResourceRecordList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ResourceRecordCreate from "./ResourceRecordCreate";
import Image from "material-ui-image";
import CustomPagination from "../pagination/customPagination";
import { getUserRole } from "../../service/authService";
import FilterView from "./filters/filterView";
import { Hidden } from '@material-ui/core';


const itemsNumber = 5;

const paginationStyle = {
    padding: 20
};

class ResourceRecordView extends Component {

    state = {
        records: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        resourceTemplate: "",
        tableName: this.props.match.params.tableName,
        openDialog: false
    };

    getRecordsData = (pageNumber) => {
        axios.get(`/resource/${this.state.tableName}?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let records = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                records: records,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
        })
    };
    setRecordsData = (records) => {
        this.setState({ records })
    };
    getResourceTemplateData = () => {
        axios.get(`/resource-template/table/${this.state.tableName}`).then(response => {
            this.setState({ resourceTemplate: response.data })
        })
    };
    handleClose = () => {
        this.setState({ openDialog: false })
    };
    handleOpen = () => {
        this.setState({ openDialog: true })
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getRecordsData(pageNumber);
    };

    verifyUser = () => {
        return getUserRole() === "ROLE_REGISTER";
    }

    componentDidMount() {
        //this.getRecordsData();
        this.getResourceTemplateData();
        this.getRecordsData(this.state.activePage);
    }

    render() {
        // function relatedResourceTableName() {
        //     this.state.resourceTemplate.resourceParameters.map(key => {
        //         if (key.parameterType === "POINT_REFERENCE") {
        //             return key['relatedResourceTemplateTableName'];
        //         }
        //     })
        // }
        return (
            <div>
                <div>
                    <h1>{this.state.resourceTemplate.name}</h1>
                </div>
                <Hidden mdUp={!this.verifyUser()}>
                    <Button style={{ marginBottom: 40 }}
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleIcon />}
                        onClick={this.handleOpen}>
                        Add record
                    </Button>
                </Hidden>
                <Grid container spacing={3}>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <FilterView label="Filter"
                            resourceTemplate={this.state.resourceTemplate}
                            setRecordsData={this.setRecordsData} />
                        {this.state.resourceTemplate &&
                            <ResourceRecordList
                                tableName={this.state.tableName}
                                records={this.state.records}
                                resourceTemplate={this.state.resourceTemplate}
                                getRecordsData={() => this.getRecordsData(this.state.activePage)}
                            />}
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={3} />
                </Grid>
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
                <Dialog fullWidth={true}
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title"
                    open={this.state.openDialog}>
                    <DialogTitle id="simple-dialog-title">Create new {this.state.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordCreate handleClose={this.handleClose}
                        tableName={this.state.tableName}
                        resourceTemplate={this.state.resourceTemplate}
                        // relatedResourceTableName={relatedResourceTableName}
                        getRecordsData={() => this.getRecordsData(this.state.activePage)}
                    />

                </Dialog>
            </div>
        );
    }
}

export default ResourceRecordView;