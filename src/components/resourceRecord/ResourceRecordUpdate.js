import React, {Component} from 'react';
import axios from "../../utils/axios";
import DialogContent from "@material-ui/core/DialogContent";
import {FormControl, TextField} from "@material-ui/core";
import PointInteger from "./parametersTypes/PointInteger";
import PointString from "./parametersTypes/PointString";
import PointDouble from "./parametersTypes/PointDouble";
import RangeInteger from "./parametersTypes/RangeInteger";
import RangeDouble from "./parametersTypes/RangeDouble";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class ResourceRecordUpdate extends Component {

    state = {
        name: undefined,
        description: undefined,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: {}
    }

    update = () => {
        axios.patch(`/resource-template/resource/${this.props.tableName}/${this.props.item.id}`, this.state).then(
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
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField required type="text" label="name" value={this.props.item.name} onChange={this.onChangeName}/>
                            {/*// helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>*/}

                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" value={this.props.item.description} onChange={this.onChangeDescription}/>
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
                                                   value={this.props.item.parameters[element.columnName]}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_STRING') {
                                e = (<PointString key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  value={this.props.item.parameters[element.columnName]}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_DOUBLE') {
                                e = (<PointDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  value={this.props.item.parameters[element.columnName]}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_INTEGER') {
                                e = (<RangeInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   value={this.props.item.parameters[element.columnName]}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_DOUBLE') {
                                e = (<RangeDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  value={this.props.item.parameters[element.columnName]}
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
                    <Button autoFocus onClick={this.update} color="primary">
                        Update
                    </Button>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default ResourceRecordUpdate;