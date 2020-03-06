import React, {Component} from 'react';
import {FormControl, TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";

const formControlStyles = {
    marginBottom: 20
}


class ResourceRecordCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        parameters: this.props.resourceTemplate.resourceParameters,
        data: {}
    }

    create = () => {
        // let data = {
        //     "name": this.props.name,
        //     "parameterType": `${this.state.parameter.toUpperCase()}_${this.state.parameterType.toUpperCase()}`
        // }
        // if (this.state.parameterType === "reference") {
        //     data["relatedResourceTemplateId"] = this.state.relatedResourceTemplateId
        // }
        axios.post(`/resource-template/resource/${this.props.tableName}`, this.state).then(
            response => {
                this.setState({
                    name: "",
                    description: "",
                    parameters: {}
                })
                // this.props.getData()
            }).catch(error => {
            console.dir(error.response.data);
        })
    };

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

        // this.props.setData(this.props.columnName, event.target.value)
    }

    setData = (columnName, value) =>
    {
        this.setState({data: {...this.state.data, [columnName]:value}})
    }


    render() {
        console.log(this.state.data)
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField type="text" label="name" onChange={this.onChangeName}/>
                            {/*// helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>*/}

                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
                        </FormControl>
                    </div>
                    {this.state.parameters.map(element => <div><FormControl>
                        {/*if (element.)*/}
                            <TextField key={element.name} type="text" label={element.name} setData={this.setData}/>
                        </FormControl></div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.create} color="primary">
                        Create
                    </Button>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default ResourceRecordCreate;