import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from '../../utils/axios';
import { getUserRole } from '../../service/authService';
import Auth from '../../hoc/auth';


class ResourceTemplateUpdate extends Component {

    state = {
        resTempId: this.props.match.params.id,
        oldName: "",
        name: "",
        oldDescription: "",
        description: ""
    }


    getData = () => {
        axios.get(`/resource-template/${this.state.resTempId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name,
                    oldName: data.name,
                    description: data.description,
                    oldDescription: data.description
                })
            }).catch(error => {
                console.dir(error.response.data);

            })

    }

    updateData = () => {
        let data = {};
        if (this.state.name !== this.state.oldName) {
            data["name"] = this.state.name;
        }
        if (this.state.description !== this.state.oldDescription) {
            data["description"] = this.state.name;
        }
        axios.patch(`/resource-template/${this.state.resTempId}`, data).then(
            response => {
                this.getData()
            }, error => {

            }
        )
    }

    verifyUser = () => {
        if(getUserRole() !== "ROLE_MANAGER"){
            this.props.history.push("/home");
        }
    }


    componentDidMount() {
        this.verifyUser();
        this.getData();
    }

    isValid = () => {
        return this.state.name !== "" &&
            (this.state.name !== this.state.oldName ||
                this.state.description !== this.state.oldDescription);
    }

    onChangeName = (event) => {
        let name = event.target.value.trim();
        this.setState({ name });
    }

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({ description });
    }

    render() {
        return (
            <div>
                <Auth>
                    <TextField type="text" label="name" onChange={this.onChangeName} value={this.state.name} />
                    <TextField type="text" label="description" onChange={this.onChangeDescription} value={this.state.description} />
                    <Button variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<EditIcon />}
                        disabled={!this.isValid()}
                        onClick={this.updateData}
                    >Update</Button>
                </Auth>
            </div>
        );
    }
}

export default ResourceTemplateUpdate;