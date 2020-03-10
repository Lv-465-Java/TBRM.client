import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from "@material-ui/core";

class FilterPointNumberField extends Component {
    state = {
        label: this.props.name,
        value: "",
        operation: ""

    };

    onChangeOperation = (event) => {
        let operation = event.target.value;
        this.setState({operation}, () => {
            this.props.setFilter(this.state.label, this.buildFilter());
        });
    };
    onChangeValue = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.state.label, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {label, value, operation} = this.state;
        if (this.state.value !== "" && this.state.operation !== ""){
            return `${label}${operation}'${value}'`
        }
        return ""
    };


    render() {

        console.log(this.state.label)
        return (
            <>
                {this.state.label}
                <FormControl >
                    <Select
                        value={this.state.operation}
                        onChange={this.onChangeOperation}

                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'='}>{'='}</MenuItem>
                        <MenuItem value={'<'}>{'<'}</MenuItem>
                        <MenuItem value={'>'}>{'>'}</MenuItem>
                    </Select>
                </FormControl>
                <TextField type="text" label={this.state.label} onChange={this.onChangeValue}
                           helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>


            </>
        );
    }
}

export default FilterPointNumberField;