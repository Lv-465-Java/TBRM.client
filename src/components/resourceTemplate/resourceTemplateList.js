import React, {Component} from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import {Button, Grid} from '@material-ui/core';
import {getUserRole} from '../../service/authService';
import CustomPagination from "../pagination/customPagination";
import SearchView from "./search/searchView";

const style = {

    display: "flex",
    flexWrap: "wrap",
};

const gridStyle = {
    marginTop: 40
};
const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    marginTop: 40
};

const itemsNumber = 9;

const paginationStyle = {
    padding: 20
};

class ResourceTemplateList extends Component {

    state = {
        resourceTemplates: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
    };

    getData = (pageNumber) => {
        axios.get(`resource-template?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let resourceTemplates = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                resourceTemplates: resourceTemplates,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            console.log(response.data);
        })
    };

    getAllPublishedTemplates = (pageNumber) => {
        axios.get(`resource-template/published?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let resourceTemplates = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                resourceTemplates: resourceTemplates,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            this.setState({resourceTemplates});
        })
    };

    componentDidMount() {
        if (getUserRole() === "ROLE_MANAGER") {
            this.getData(this.state.activePage);
        } else {
            this.getAllPublishedTemplates(this.state.activePage);
        }
    }

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        if (getUserRole() === "ROLE_MANAGER") {
            this.getData(pageNumber);
        } else {
            this.getAllPublishedTemplates(pageNumber);
        }
    };

    goToCreateResource = () => {
        this.props.history.push("/resource-template/create");
    };

    setRecordsData = (resourceTemplates) => {
        this.setState({resourceTemplates})
    };

    render() {

        let userLinks = (getUserRole() === "ROLE_MANAGER") ?
            (
                <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={this.goToCreateResource}>Create template</Button>
            ) : (
                <div></div>
            )

        return (
            <div>
                {userLinks}
                <Grid container spacing={1} style={gridStyle}>
                    <Grid item xs/>
                    <Grid item xs={10}>
                        <SearchView label="Search"
                                    resourceTemplate={this.state.resourceTemplate}
                                    setRecordsData={this.setRecordsData}/>
                        <div style={style}>
                            {this.state.resourceTemplates.map((item) =>
                                (<ResourceTemplateItem key={item.id}
                                                       item={item}/>)
                            )}
                        </div>
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
                </Grid>
            </div>
        );
    }
}

export default ResourceTemplateList;