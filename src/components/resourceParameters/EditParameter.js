import React, {Component} from 'react';
import {Box, Grid, TextField} from "@material-ui/core";
import DropdownParameterType from "./DropdownParameterType";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../utils/axios";
import ResourceParametersList from "./ResourceParametersList";
import DropdownTemplate from "../resourceTemplate/DropdownTemplate";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const PARAMETER_TYPE = {
    point: ["int", "double", "string", "reference"],
    range: ["int", "double"],
    coordinates: ["string"]
};

class EditParameter extends Component {

    state = {
        columnName: "",
        name: this.props.name,
        parameter: this.props.parameterType.split('_')[0].toLowerCase(),
        parameterType: this.props.parameterType.split('_')[1].toLowerCase(),
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
        // let body = { 'isPublished': false };

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
        return this.state.name.length === 0;
    };


    render() {
        return (
            <>

                <TableCell align="right">
                    <TextField type="text" name="name" onChange={this.onChangeName} value={this.state.name}/>
                </TableCell>

                <TableCell align="right">
                    <DropdownParameterType parameterType={this.state.parameter}
                                           onChangeParameterType={this.onChangeParameter}
                                           list={Object.keys(PARAMETER_TYPE)}/>

                    {!!this.state.parameter && <DropdownParameterType parameterType={this.state.parameterType}
                                                                      onChangeParameterType={this.onChangeParameterType}
                                                                      list={PARAMETER_TYPE[this.state.parameter]}/>}
                </TableCell>
                <TableCell align="right">

                </TableCell>
                <TableCell align="right">
                    {this.state.parameterType === "reference" &&
                    <DropdownTemplate setRelatedResourceTemplateId={this.setRelatedResourceTemplateId}/>}
                </TableCell>
                <Tooltip title="Save">
                    <IconButton aria-label="save" color="primary" onClick={this.save}>
                        <AddCircleOutlineOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                    <IconButton aria-label="cancel" color="secondary" onClick={this.props.cancelClick}>
                        <CancelOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </>
        );
    }
}

export default EditParameter;