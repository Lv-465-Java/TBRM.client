import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from '../../utils/axios';


class ResourceTemplateCreate extends Component{

    state = {
        userId: 5,
        name: undefined,
        description: undefined,
    }

    create = () => {
        axios.post("/resource-template", this.state).then(response => {
                this.props.history.push("/resource-template");
        }, error => {

        })
    }

    isValid = () => {
        return this.state.name === undefined;
    }

    onChangeName = (event) => {
        let name = event.target.value;
        if(name.trim().length === 0){
            name = undefined;
        }
        this.setState({name});
    }

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    }
    
    render(){
        return(
            <div>
            <TextField type="text" label="name" onChange={this.onChangeName}/>
            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
            <Button variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon/>}
                    disabled={this.isValid()}
                    onClick={this.create}
                    >Create</Button>
            </div>
        );
    }
}

export default ResourceTemplateCreate;