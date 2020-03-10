import React, {Component} from 'react';
import {TextField} from "@material-ui/core";

class FilterPointStringField extends Component {
    state = {
        label: this.props.name,
        value: "",
        errorMessage: undefined
    };

    onChange = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.state.label, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {label, value} = this.state;


        if (this.state.value !== "") {
            return `${label}:'${value}'`
        }
        return ""
    };

    render() {


        return (
            <>
                <TextField type="text" label={this.state.label} onChange={this.onChange}
                           helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>
            </>
        );
    }
}

export default FilterPointStringField;