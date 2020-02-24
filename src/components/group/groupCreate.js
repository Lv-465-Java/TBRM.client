import React, {Component} from "react";
import axios from "../../utils/axios";
import {TextField, Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

class GroupCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
    }

    create = () => {
        axios.post("/group", this.state).then(response => {
            this.props.history.push("/group")
        }, error => {

        })
    }

    isValid = () => {
        return this.state.name === undefined;
    }

    onChangeName = (event) => {
        let name = event.target.value;
        if (name.trim().length === 0) {
            name = undefined;
        }
        this.setState({name});
    }

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    }

    render() {
        return (<div>
            <TextField type="text" label="name" onChange={this.onChangeName}/>
            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
            <Button variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon/>}
                    disabled={this.isValid()}
                    onClick={this.create}
            >Create</Button>
        </div>);
    }
}

export default GroupCreate;