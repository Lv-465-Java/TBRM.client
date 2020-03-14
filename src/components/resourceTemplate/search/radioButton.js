import React, {Component} from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

class RadioButton extends Component {

    state = {
        value: undefined
    };

    onChange = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        if (this.state.value !== "") {
            return `${this.props.columnName}='${this.state.value}'`
        }
        return ""
    };
    // handleChange = (event) => {
    //     let a = event.target.value;
    //     console.log(a);
    //     this.setState({value: a});
    // };

    reset = () => {
        this.setState({value: ""}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        })
    };

    render() {

        return (
            <div>
                <RadioGroup name="radio" onChange={this.onChange}>
                    {this.props.name}
                    <FormControlLabel
                        value="false"
                        control={<Radio color="primary"/>}
                        label="False"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary"/>}
                        label="True"
                        labelPlacement="end"
                    />
                    <IconButton aria-label="delete"
                                color="primary"
                                onClick={this.reset}>
                        <HighlightOffIcon/>
                    </IconButton>
                </RadioGroup>
            </div>
        );
    }
}

export default RadioButton;