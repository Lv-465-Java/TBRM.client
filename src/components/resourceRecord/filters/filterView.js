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
            this.props.setRecordsData(response.data.content)
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
                {parameters.map((element, index) => {

                    switch (element["parameterType"]) {
                        case "POINT_REFERENCE":
                            return <FilterPointReferenceField key={index}
                                                              setFilter={this.setFilter}
                                                              name={element["name"]}
                                                              columnName={element["columnName"]}
                                                              relatedResourceTableName={element["relatedResourceTemplateTableName"]}
                                                              setData={this.setData}/>;
                        case "POINT_STRING":
                            return <FilterPointStringField key={index}
                                                           setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "POINT_DOUBLE":
                            return <FilterPointNumberField key={index}
                                                           setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "POINT_INT":
                            return <FilterPointNumberField key={index}
                                                           setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "RANGE_DOUBLE":
                            return <FilterRangeNumberField key={index}
                                                           setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>;
                        case "RANGE_INT":
                            return <FilterRangeNumberField key={index}
                                                           setFilter={this.setFilter}
                                                           name={element["name"]}
                                                           columnName={element["columnName"]}/>
                        default:
                            return undefined;
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