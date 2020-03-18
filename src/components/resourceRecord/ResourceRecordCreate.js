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
import PhotoUpload from "./parametersTypes/PhotoUpload";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AttachFileIcon from "@material-ui/icons/AttachFile";

class ResourceRecordCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: undefined,
        open: false,
        selectedFile: [],
        selectedPhoto:[],
        err: ''
    }
    handleClickAddPhoto = (event) => {
        const files = [];
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i]);
            }
            this.setState({
                selectedPhoto: files
            })
        }
    };

    checkMimeType = (event) => {
        let files = event.target.files;
        const types = ['image/png', 'image/jpeg', 'image/gif'];
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                // eslint-disable-next-line no-template-curly-in-string
                this.setState({err: (' is not a supported format')});
            }else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size = 4000000;
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                this.setState({err: 'image is too large, please pick a smaller file'});
                return false
            } else {
                this.setState({err: ('')});
                return true;
            }

        }
    }

    checkDocumentSize = (event) => {
        let files = event.target.files;
        let size = 2000000;
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                this.setState({err: 'document is too large, please pick a smaller file'});
                return false
            } else {
                this.setState({err: ('')});
                return true;
            }

        }
    }

    checkMimeTypeDocument = (event) => {
        let files = event.target.files;
        const types = ['application/pdf', 'application/rtf', 'text/plain'];
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                // eslint-disable-next-line no-template-curly-in-string
                this.setState({err: (' is not a supported format')});
            }else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    handleClickAddDocument = (event) => {
        const files = [];
        if (this.checkDocumentSize(event) && (this.checkMimeTypeDocument(event))) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i]);
            }
            this.setState({
                selectedFile: files
            })
        }
    };


    UpdatePhoto = (tableName,id) => {
        const formData = new FormData();
        for (let i = 0; i < this.state.selectedPhoto.length; i++) {
            formData.append('files', this.state.selectedPhoto[i]);
        }
        axios.put(`/resource-template/resource/${tableName}/${id}/updatePhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
        });
    }

    UploadDocument= (tableName,id) =>{
        const formData = new FormData();
        for (let i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put(`/resource-template/resource/${tableName}/${id}/document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
        });
    }

    create = () => {
        var table=this.props.tableName;
        axios.post(`/resource-template/resource/${this.props.tableName}`, this.state).then(
            response => {
                this.setState({
                    name: "",
                    description: "",
                    parameters: {},
                    open: true
                })
                this.props.getRecordsData();
                  if(  this.state.selectedPhoto!==[]) {
                      this.UpdatePhoto(table,3);
                  }
                if (this.state.selectedFile!==[]) {
                    this.UploadDocument(table,2)}
                }
                ).catch(error => {
            console.dir(error.response.data);
        })
    };

    getParametersSize = (parameters) => {
        let len = 0;
        for (const count in parameters) {
            len++;
        }
        return len;
    }

    isCreateNotValid = () => {
        return (this.state.name === undefined
            || this.state.parameters === undefined
            || ((this.getParametersSize(this.state.parameters) < this.state.resourceParameters.length)))
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

    render() {
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField required type="text" label="name" onChange={this.onChangeName}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
                        </FormControl>
                    </div>
                    <div>
                            <Grid xl={12}>
                                <CssBaseline/>
                                {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                                <IconButton
                                    color="primary"
                                    component="label"
                                >
                                    <AddAPhotoIcon/>
                                    <input type='file' multiple='true'
                                           style={{display: "none"}}
                                           onChange={this.handleClickAddPhoto}
                                    />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    component="label"
                                >
                                    <AttachFileIcon/>
                                    <input type='file' multiple='true'
                                           style={{display: "none"}}
                                           onChange={this.handleClickAddDocument}
                                    />
                                </IconButton>
                            </Grid>
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
                            else if (element.parameterType === 'COORDINATES_STRING') {
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
                    <Button autoFocus disabled={this.isCreateNotValid()} onClick={this.create} color="primary">
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