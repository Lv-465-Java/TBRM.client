import React, {Component} from 'react';
import {FormControl, TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import PointInteger from "./parametersTypes/PointInteger";
import RangeDouble from "./parametersTypes/RangeDouble";
import PointString from "./parametersTypes/PointString";
import PointDouble from "./parametersTypes/PointDouble";
import RangeInteger from "./parametersTypes/RangeInteger";
import PointReference from "./parametersTypes/PointReference";
import CoordinateString from "./parametersTypes/CoordinateString";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const formControlStyles = {
    marginBottom: 20
}


class ResourceRecordCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: undefined,
        // parameters: {},
        open: false
    }

    create = () => {
        axios.post(`/resource-template/resource/${this.props.tableName}`, this.state).then(
            response => {
                this.setState({
                    name: "",
                    description: "",
                    parameters: {},
                    open: true
                    // data: {}
                })
                this.props.getRecordsData();
                // this.props.handleClose();

            }).catch(error => {
            console.dir(error.response.data);
        })
    };

    isCreateNotValid = () => {
        return (this.state.parameters)
    }

    onChangeName = (event) => {
        let name = event.target.value;
        if (name.trim().length === 0) {
            name = undefined;
        }
        this.setState({name});
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.handleClose();
    }

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    }

    setData = (columnName, value) => {
        this.setState({parameters: {...this.state.parameters, [columnName]: value}})
    }

    // relatedResourceTableName() {
    //     this.state.resourceParameters.map(key => {
    //         if (key.parameterType === "POINT_REFERENCE") {
    //             return  key['relatedResourceTemplateTableName'];
    //         }
    //     })
    // }


    render() {
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField required type="text" label="name" onChange={this.onChangeName}/>
                            {/*// helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>*/}

                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
                        </FormControl>
                    </div>
                    {
                        // elements
                        this.state.resourceParameters.map(element => {
                            let e;
                            if (element.parameterType === 'POINT_INT') {
                                e = (<PointInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_STRING') {
                                e = (<PointString key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_DOUBLE') {
                                e = (<PointDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_INT') {
                                e = (<RangeInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_DOUBLE') {
                                e = (<RangeDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_REFERENCE') {
                                e = (<PointReference key={element.name}
                                                     label={element.name}
                                                     columnName={element.columnName}
                                                     relatedResourceTableName={element['relatedResourceTemplateTableName']}
                                                     setData={this.setData}/>)
                            } else if (element.parameterType === 'COORDINATES_STRING') {
                                e = (<CoordinateString key={element.name}
                                                       label={element.name}
                                                       columnName={element.columnName.concat('_coordinate')}
                                                       setData={this.setData}/>)
                            }
                            return e;
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.create} color="primary">
                        Create
                    </Button>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Resource successfully added
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default ResourceRecordCreate;