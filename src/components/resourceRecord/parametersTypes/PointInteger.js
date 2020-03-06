import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class PointInteger extends Component {

    onChangePointInteger = (event) => {
        // let pointInteger = event.target.value;
        // this.setState({pointInteger});
        this.props.setData(this.props.columnName, event.target.value)
    };

    render() {
        return (
            <div>
                <TextField pattern="^\d+$" type="number" label={this.props.label} onChange={this.onChangePointInteger}/>
            </div>
        );
    }
}

export default PointInteger;