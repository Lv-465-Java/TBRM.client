import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class RangeInteger extends Component {

    state = {
        label: this.props.label
    }

    onChangeRangeIntegerFrom = (event) => {
        this.props.setData(this.props.columnName.concat('_from'), parseInt(event.target.value))
    };

    onChangeRangeIntegerTo = (event) => {
        this.props.setData(this.props.columnName.concat('_to'), parseInt(event.target.value))
    };

    render() {
        return (
            <div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' from')}
                               onChange={this.onChangeRangeIntegerFrom}/>
                </div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' to')}
                               onChange={this.onChangeRangeIntegerTo}/>
                </div>
            </div>
        );
    }
}

export default RangeInteger;