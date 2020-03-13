import React, {Component} from 'react';
import {Grid, TextField} from "@material-ui/core";
import DropdownParameterType from "./DropdownParameterType";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../utils/axios";
import DropdownTemplate from "../resourceTemplate/DropdownTemplate";

const PARAMETER_TYPE = {
    point: ["int", "double", "string", "reference"],
    range: ["int", "double"],
    coordinates: ["string"]
};

class CreateParameter extends Component {

    state = {
        columnName: "",
        name: "",
        parameter: "",
        parameterType: "",
        pattern: "",
        relatedResourceTemplateId: ""
    };

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    };

    onChangeParameter = (e) => {
        this.setState({parameter: e.target.value})
    };
    onChangeParameterType = (e) => {
        this.setState({parameterType: e.target.value})
    };

    setRelatedResourceTemplateId = (id) => {
        this.setState({relatedResourceTemplateId: id})
    };

    create = () => {
        let data = {
            "name": this.state.name,
            "parameterType": `${this.state.parameter.toUpperCase()}_${this.state.parameterType.toUpperCase()}`
        }
        if (this.state.parameterType === "reference") {
            data["relatedResourceTemplateId"] = this.state.relatedResourceTemplateId
        }
        axios.post(`/resource-template/${this.props.resTempId}/resource-parameter`, data).then(
            response => {
                this.setState({
                    columnName: "",
                    name: "",
                    parameter: "",
                    parameterType: "",
                    pattern: "",
                    relatedResourceTemplateId: ""
                })
                this.props.getData()
            }).catch(error => {
            console.dir(error.response.data);
        })
    };
    isNotValid = () => {
        let {name, parameter, parameterType} = this.state;
        return (name === "" || parameter === "" || parameterType === "");
    };


    render() {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Button variant="contained"
                                color="primary"
                                startIcon={<EditIcon/>}
                                onClick={this.create}
                                disabled={this.isNotValid()}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Name" type="text" name="name" onChange={this.onChangeName}
                                   value={this.state.name}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DropdownParameterType parameterType={this.state.parameter}
                                               onChangeParameterType={this.onChangeParameter}
                                               list={Object.keys(PARAMETER_TYPE)}
                                               label="Parameter"/>
                    </Grid>
                    <Grid item xs={2}>
                        {!!this.state.parameter && <DropdownParameterType parameterType={this.state.parameterType}
                                                                          onChangeParameterType={this.onChangeParameterType}
                                                                          list={PARAMETER_TYPE[this.state.parameter]}
                                                                          label="ParameterType"/>}
                    </Grid>
                    <Grid item xs={2}>
                        {this.state.parameterType === "reference" &&
                        <DropdownTemplate setRelatedResourceTemplateId={this.setRelatedResourceTemplateId}/>}
                    </Grid>


                </Grid>
            </>
        );
    }
}

export default CreateParameter;