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
import InputField from "../inputField/inputField";

const formControlStyles = {
    marginBottom: 20
}


class ResourceRecordCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: {}
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
                    parameters: {},
                    // data: {}
                })
                this.props.getRecordsData()
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

    setData = (columnName, value) => {
        this.setState({parameters: {...this.state.parameters, [columnName]: value}})
    }


    render() {
        // let elements = this.state.resourceParameters.map(element =>
        //
        //     (<div>
        //         <FormControl>
        //
        //
        //             {(element.parameterType === 'POINT_INT')}?
        //             <TextField key={element.name}
        //                        type="text"
        //                        label={element.name}
        //                        setData={this.setData}/>:
        //             <div/>
        //
        //         </FormControl>
        //     </div>)
        // )

        console.log(this.state.parameters)
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
                            } else if (element.parameterType === 'RANGE_DOUBLE') {
                                e = (<RangeDouble key={element.name}
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
                            }
                            return e;
                        })
                    }
                    {/*//     (<FormControl>*/}
                    {/*//*/}
                    {/*//             {*/}
                    {/*//                 if(element.parameterType === 'POINT_INT'){*/}
                    {/*//                 <TextField key={element.name}*/}
                    {/*//                 type="text"*/}
                    {/*//                 label={element.name}*/}
                    {/*//                 setData={this.setData}/>}*/}
                    {/*//             }*/}
                    {/*//         </FormControl>)*/}
                    {/*//*/}
                    {/*// )}*/}
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