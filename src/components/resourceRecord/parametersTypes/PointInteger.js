import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class PointInteger extends Component {

    onChangePointInteger = (event) => {
        this.props.setData(this.props.columnName, parseInt(event.target.value))
    };

    render() {
        return (
            <div>
                <TextField required pattern="^\d+$" type="number" label={this.props.label}
                           onChange={this.onChangePointInteger}/>
            </div>
        );
    }
}

export default PointInteger;