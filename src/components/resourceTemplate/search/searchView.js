import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import PointStringField from "./pointStringField";
import RadioButton from "./radioButton";
import PointReferenceField from "./pointReferenceField";

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
                <PointStringField setFilter={this.setFilter}
                                  name="Name"
                                  columnName={"name"}/>
                <PointStringField setFilter={this.setFilter}
                                  name="Description"
                                  columnName={"description"}/>
                {/*<PointStringField setFilter={this.setFilter}*/}
                {/*                  name="Is published"*/}
                {/*                  columnName={"isPublished"}/>*/}
                <RadioButton setFilter={this.setFilter}
                             name="Is published"
                             columnName={"isPublished"}/>

                <PointReferenceField setFilter={this.setFilter}
                                     name="User"
                                     columnName={"user"}
                                     setData={this.setData}/>
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