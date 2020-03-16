import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import PointStringField from "./pointStringField";
import PointReferenceField from "./pointReferenceField";
import RadioButton from "./radioButton";
import {getUserRole} from "../../../service/authService";

class SearchView extends Component {
    state = {
        searchCriteria: {}
    };

    setFilter = (name, search) => {
        console.log(this.state.searchCriteria);
        let searchCriteria = {...this.state.searchCriteria};
        console.log(searchCriteria);
        if (search !== "") {
            console.log(searchCriteria[name]);
            searchCriteria[name] = search;
        } else {
            delete searchCriteria[name];
        }
        this.setState({searchCriteria});
    };

    getData = () => {
        console.log(this.state.searchCriteria);
        let searchUrl = `/search?search=${Object.values(this.state.searchCriteria).join(',')}`;
        console.log(searchUrl);

        axios.get(searchUrl).then(response => {
            this.props.setRecordsData(response.data.content)
        })

    };

    dontShowFullSearch = () => {
        return getUserRole() === "ROLE_REGISTER";
    };

    render() {

        let showFullSearch = (getUserRole() === "ROLE_REGISTER") ? (
                (this.setState({searchCriteria: "isPublished='true'"}))
            ) :
            (
                <RadioButton setFilter={this.setFilter}
                             name="Is published"
                             columnName={"isPublished"}/>);

        return (
            <div className="filterField">
                <div>
                    <PointStringField setFilter={this.setFilter}
                                      name="Name"
                                      columnName={"name"}/>
                    <PointStringField setFilter={this.setFilter}
                                      name="Description"
                                      columnName={"description"}/>
                    <PointReferenceField setFilter={this.setFilter}
                                         name="User"
                                         columnName={"user"}
                                         setData={this.setData}/>
                    {showFullSearch}
                    {/*<Hidden mdUp={this.dontShowFullSearch()}>*/}
                    {/*    <RadioButton setFilter={this.setFilter}*/}
                    {/*                 role="ROLE_REGISTER"*/}
                    {/*                 name="Is published"*/}
                    {/*                 columnName={"isPublished"}/>*/}
                    {/*</Hidden>*/}
                    {/*<Hidden mdUp={this.dontShowFullSearch()}>*/}
                    {/*    <RadioButton setFilter={this.setFilter}*/}
                    {/*                 name="Is published"*/}
                    {/*                 columnName={"isPublished"}/>*/}
                    {/*</Hidden>*/}
                </div>
                <IconButton aria-label="delete"
                            color="primary"
                            onClick={this.getData}>
                    <SearchIcon/>
                </IconButton>
            </div>
        );
    }
}

export default SearchView;