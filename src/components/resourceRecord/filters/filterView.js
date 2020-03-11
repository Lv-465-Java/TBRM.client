import React, {Component} from 'react';
import FilterPointStringField from "./filterPointStringField";
import SearchIcon from '@material-ui/icons/Search';
import FilterPointNumberField from "./filterPointNumberField";
import FilterPointReferenceField from "./filterPointReferenceField";
import FilterRangeNumberField from "./filterRangeNumberField";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";

class FilterView extends Component {
    state = {
        type: "",
        filters: {},
    };

    setFilter = (name, filterStr) => {
        let filters = {...this.state.filters};
        if (filterStr !== "") {
            filters[name] = filterStr;
        } else {
            delete filters[name];
        }
        this.setState({filters});
    };

    getData = () => {
        console.log(this.state.filters);
        let searchUrl = `/${this.props.resourceTemplate["tableName"]}/filter?filter=${Object.values(this.state.filters).join(',')}`;
        console.log(searchUrl);

        axios.get(searchUrl).then(response => {
            this.props.setRecordsData(response.data)
        })

    };

    render() {
        let parameters = this.props.resourceTemplate["resourceParameters"] || [];

        return (
            <div className="filterField">
                <FilterPointStringField setFilter={this.setFilter}
                                        name="Name"
                                        columnName={"name"}/>
                <FilterPointStringField setFilter={this.setFilter}
                                        name="Description"
                                        columnName={"description"}/>
                {parameters.map(element => {

                    switch (element["parameterType"]) {
                        case "POINT_REFERENCE":
                            return <FilterPointReferenceField setFilter={this.setFilter}
                                                              name={element["name"]}
                                                              columnName={element["columnName"]}/>;
                        case "POINT_STRING":
                            return <FilterPointStringField setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "POINT_DOUBLE":
                            return <FilterPointNumberField setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "POINT_INT":
                            return <FilterPointNumberField setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "RANGE_DOUBLE":
                            return <FilterRangeNumberField setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "RANGE_INT":
                            return <FilterRangeNumberField setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>
                    }
                })}
                <IconButton aria-label="delete"
                            color="primary"
                            onClick={this.getData}>
                    <SearchIcon/>
                </IconButton>

            </div>
        );
    }
}

export default FilterView;