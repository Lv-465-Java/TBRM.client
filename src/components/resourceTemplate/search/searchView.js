import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import PointStringField from "./pointStringField";
import PointReferenceField from "./pointReferenceField";
import RadioButton from "./radioButton";

class SearchView extends Component {
    state = {
        searchCriteria: {},
    };

    setFilter = (name, search) => {
        let searchCriteria = {...this.state.searchCriteria};
        if (search !== "") {
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

    render() {
        return (
            <div className="filterField">
                <div>
                    <PointStringField setFilter={this.setFilter}
                                      name="Name"
                                      columnName={"name"}/>
                    <RadioButton setFilter={this.setFilter}
                                 name="Is published"
                                 columnName={"isPublished"}/>

                </div>
                <div>
                    <PointStringField setFilter={this.setFilter}
                                      name="Description"
                                      columnName={"description"}/>
                    <PointReferenceField setFilter={this.setFilter}
                                         name="User"
                                         columnName={"user"}
                                         setData={this.setData}/>
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