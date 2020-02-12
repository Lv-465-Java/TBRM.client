import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class InputField extends Component {

    state = {
        type: this.props.type,
        onChange: this.props.onChange,
        label: this.props.label
    }
    

    render() {
        return (
        <div>
            <TextField type={this.props.type} id="standard-basic" label={this.props.label} onChange={this.props.onChange}/>
        </div>
        );
    }

}

export default InputField;