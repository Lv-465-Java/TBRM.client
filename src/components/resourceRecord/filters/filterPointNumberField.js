import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {TextField} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

class FilterPointNumberField extends Component {
    state = {
        value: "",
        operation: ""
    };

    onChangeOperation = (event) => {
        let operation = event.target.value;
        this.setState({operation}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    onChangeValue = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {value, operation} = this.state;
        if (this.state.value !== "" && this.state.operation !== "") {
            return `${this.props.columnName}${operation}'${value}'`
        }
        return ""
    };

    reset = () => {
        this.setState({value: ""}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
        this.setState({operation: ""}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    render() {
        return (
            <>
                <div className={"filterCells"}>
                    {this.props.name}
                    <Select value={this.state.operation}
                            onChange={this.onChangeOperation}
                            displayEmpty>
                        <MenuItem value={'!='}>{'≠'}</MenuItem>
                        <MenuItem value={'='}>{'='}</MenuItem>
                        <MenuItem value={'<'}>{'<'}</MenuItem>
                        <MenuItem value={'>'}>{'>'}</MenuItem>
                    </Select>
                    <TextField type="number"
                               onChange={this.onChangeValue}
                               style={{minWidth: "30px"}}
                               helperText={this.state.errorMessage}
                               error={!!this.state.errorMessage}/>
                    <IconButton aria-label="delete"
                                color="primary"
                                onClick={this.reset}>
                        <HighlightOffIcon/>
                    </IconButton>
                </div>
            </>
        );
    }
}

export default FilterPointNumberField;