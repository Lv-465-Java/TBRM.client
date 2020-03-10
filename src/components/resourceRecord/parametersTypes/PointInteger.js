import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {FormControl} from "@material-ui/core";

class PointInteger extends Component {

    onChangePointInteger = (event) => {
        this.props.setData(this.props.columnName, parseInt(event.target.value))
    };

    render() {
        return (
            <div>
                <FormControl>
                <TextField required pattern="^\d+$" type="number" label={this.props.label}
                           onChange={this.onChangePointInteger}/>
                </FormControl>
            </div>
        );
    }
}

export default PointInteger;