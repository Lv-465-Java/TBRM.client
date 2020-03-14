import React, {Component} from 'react';
import axios from "../../../utils/axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class UserDropdown extends Component {

    state = {
        users: [],
        userId: this.props.userId,
    };

    onChangeValue = (key, value, id) => {
        this.setState({value: id, refName: key.substring(0, key.length - 5)}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {value, operation} = this.state;
        if (this.state.value === "" || this.state.value === undefined) {
            return ""
        }
        return `${this.state.refName}${operation}'${value}'`
    };

    getRecordsData = () => {
        axios.get(`/user`).then(response => {
            this.setState({users: response.data["content"]})
        })
    };

    componentDidMount() {
        this.getRecordsData();
    }

    // onChange = (ob, value) => {
    //     if (value != null) {
    //         this.props.onChangePointReference(this.props.columnName.concat("_ref_name"), value.name, value.id);
    //     }
    // };
    onInputChange = (event, value, reason) => {
        if (reason === "clear") {
            this.props.onChangePointReference(this.props.columnName, "");
        }
    };

    render() {

        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.users}
                    getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                    onChange={this.onChangeValue}
                    onInputChange={this.onInputChange}
                    renderInput={params => <TextField {...params} label={"Select a user"} variant="outlined"/>}
                />
            </div>
        );
    }
}

export default UserDropdown;