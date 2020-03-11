import React, {Component} from 'react';
import {TextField} from "@material-ui/core";

class FilterPointReferenceField extends Component {
    state = {
        value: "",
        operation: "="
    };

    onChangeValue = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {value, operation} = this.state;
        if (this.state.value !== "") {
            return `${this.props.columnName}${operation}'${value}'`
        }
        return ""
    };

    render() {
        return (
            <>
                <div className={"filterCells"}>
                    {this.props.name}
                    <TextField type="text"
                               style={{minWidth: "30px"}}
                               onChange={this.onChangeValue}
                               helperText={this.state.errorMessage}
                               error={!!this.state.errorMessage}/>
                </div>
            </>
        );
    }
}

export default FilterPointReferenceField;