import React, {Component} from 'react';
import FilterPointStringField from "./filterPointStringField";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import FilterPointNumberField from "./filterPointNumberField";


class FilterView extends Component {
    state = {
        filters: {},
    };

    setFilter = (name, filterStr) => {
        let filters = {...this.state.filters}
        if (filterStr !== ""){
            filters[name] = filterStr;
        } else {
            delete filters[name];
        }
        this.setState({filters});

    };

    getData = () => {
        console.log(this.state.filters);
        let searchUrl = "/room/filter?filter=" + Object.values(this.state.filters).join(',');
        console.log(searchUrl);

    };

    render() {


        return (
            <>
                <FilterPointStringField setFilter={this.setFilter}
                                        name="test1"
                />
                <FilterPointStringField setFilter={this.setFilter}
                                        name="test2"
                />
                <FilterPointNumberField setFilter={this.setFilter}
                                        name="test3"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                    onClick={this.getData}
                >
                    Delete
                </Button>
            </>
        );
    }
}

export default FilterView;