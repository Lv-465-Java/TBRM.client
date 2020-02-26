import React, {Component} from 'react';
import {Box, Grid, TextField} from "@material-ui/core";
import DropdownParameterType from "./DropdownParameterType";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "../../utils/axios";
import ResourceParametersList from "./ResourceParametersList";

const PARAMETER_TYPE = {
    point: ["int", "double", "string", "ref"],
    range: ["int", "double", "string"],
    coordinates: []
};

class CreateParameter extends Component {

    state = {
        columnName: "",
        name: "",
        parameter: "",
        parameterType: "",
        pattern: undefined,
        relatedResourceTemplateId: undefined
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
    create = () => {
        // let body = { 'isPublished': false };

        let data = {
            "name": this.state.name,
            "parameterType": `${this.state.parameter.toUpperCase()}_${this.state.parameterType.toUpperCase()}`

        }
        axios.post(`/resource-template/${this.props.resTempId}/resource-parameter`, data).then(
            response => {
                this.props.getData()
            }).catch(error => {
                console.dir(error.response.data);
        })
    };
    isNotValid = () => {
        return this.state.name.length === 0;
    };

    // getData = () => {
    //     axios.get(`/resource-template/${this.state.resTempId}/resource-parameter`).then(
    //         response => {
    //             let data = response.data;
    //             this.setState({
    //                 columnName: data.name,
    //                 name: data.name,
    //                 parameterType: data.parameterType,
    //                 pattern: data.pattern
    //             })
    //         }).catch(error => {
    //         console.dir(error.response.data);
    //     })
    // };

    // componentDidMount() {
    //     this.getData();
    // }


    render() {
        return (
            <div>
                <Grid container spacing={3}>
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
                        <DropdownParameterType parameterType={this.state.parameter}
                                               onChangeParameterType={this.onChangeParameter}
                                               list={Object.keys(PARAMETER_TYPE)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField type="text" name="name" onChange={this.onChangeName}/>
                    </Grid>
                    <Grid item xs={2}>
                        {!!this.state.parameter && <DropdownParameterType parameterType={this.state.parameterType}
                                                                          onChangeParameterType={this.onChangeParameterType}
                                                                          list={PARAMETER_TYPE[this.state.parameter]}/>}
                    </Grid>

                    {/*<Grid item xs={2}>*/}
                    {/*    <ResourceParametersList getData={this.getData}*/}
                    {/*                            resTempId={this.state.resTempId}/>*/}
                    {/*    <CreateParameter getData={this.getData}*/}
                    {/*                     resTempId={this.state.resTempId}/>*/}
                    {/*</Grid>*/}

                </Grid>
            </div>
        );
    }
}

export default CreateParameter;