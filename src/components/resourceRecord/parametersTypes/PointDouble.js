import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import InputField from "../../inputField/inputField";
import NumericInput from 'react-numeric-input';


class PointDouble extends Component {

    state = {
        value: 0.00
    };

    onChangePointDouble = (event) => {
        this.props.setData(this.props.columnName, parseFloat(event.target.value))
        // console.log(parseInt(event.target.value));
    };

    render() {
        return (
            <div>
                {/*<NumericInput label={this.props.label} onClick={this.onChangePointDouble}/>*/}
                <TextField required type="number" label={this.props.label} value={this.props.value} onChange={this.onChangePointDouble}/>

                {/*<input type="number" label={this.props.label} onChange={this.onChangePointDouble}/>*/}
                {/*<TextField type="number" label={this.props.label} onChange={this.onChangePointDouble}/>*/}
            </div>
        );
    }
}

export default PointDouble;