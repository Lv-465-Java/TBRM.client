import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class RangeDouble extends Component {

    state = {
        label: this.props.label
    }

    onChangeRangeDoubleFrom = (event) => {
        this.props.setData(this.props.columnName.concat('_from'), parseFloat(event.target.value))
    };

    onChangeRangeDoubleTo = (event) => {
        this.props.setData(this.props.columnName.concat('_to'), parseFloat(event.target.value))
    };

    render() {
        return (
            <div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' from')} onChange={this.onChangeRangeDoubleFrom}/>
                </div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' to')} onChange={this.onChangeRangeDoubleTo}/>
                </div>
            </div>
        );
    }
}

export default RangeDouble;