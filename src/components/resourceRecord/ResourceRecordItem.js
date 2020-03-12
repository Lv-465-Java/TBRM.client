import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Link} from "react-router-dom";
import {blue} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../utils/axios";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ResourceRecordUpdate from "./ResourceRecordUpdate";
import ResourceRecordItemView from "./ResourceRecordItemView";
import {Image} from "@material-ui/icons";


const linkStyle = {
    textDecoration: 'none',
    color: blue['A400']

}
const dialogStyle = {
    maxWidth: '80%',
    maxHeight: '80%'

}


class resourceRecordItem extends Component {

    state = {
        headers: this.props.headers,
        data: {},
        openDialogEdit: false,
        openDialogView: false
    };


    delete = () => {
        axios.delete(`/resource-template/resource/${this.props.tableName}/${this.props.item.id}`).then(
            response => {
                this.props.getRecordsData();
            }).catch(error => {
            console.dir(error.response.data);
        })
    };

    handleCloseView = () => {
        this.setState({openDialogView: false})
    };
    handleOpenView = () => {
        this.setState({openDialogView: true})
    };
    handleOpenEdit = () => {
        this.setState({openDialogEdit: true})
    };
    handleCloseEdit = () => {
        this.setState({openDialogEdit: false})
    };
    getRecordValues = () => {
        this.state.data['description'] = this.props.item['description']
        this.state.data['name'] = this.props.item['name'];
        this.state.data['photos'] = this.props.item['photos'];
        Object.keys(this.props.item['parameters']).forEach(key => {
            this.state.data[key] = this.props.item['parameters'][key]
            console.log(this.state.data[key])
        });
    };

    render() {
        this.getRecordValues();
        // this.appendSth();
        // let appendSth = (parameters) => {
        //     for (let value of Object.values(parameters)) {
        //         (<><TableCell align="right">${value}</TableCell></>)
        //     }
        // };
        // let list = this.state.parameters.map((parameter) => {
        //     return (<TableCell  align="right">${parameter}</TableCell>)
        // });
        // let data = {};
        //
        // this.props.he
        // data{name, description} = this.props.item
        // console.log(this.props.item.parameters)
        // let data = {};

        // this.props.headers.map(element => {
        //
        //     if (element.columnName === 'name'){
        //         data['name'] = this.props.item['name']
        //     } else if (element.columnName === 'description'){
        //         data['description'] = this.props.item['description']
        //     } else if( typeof(element.columnName) === "object"){
        //         data[element.columnName] = this.props.item['parameters'][element.columnName]
        //
        //     } else {
        //         data[element.columnName]=this.props.item['parameters'][element.columnName]
        //     }
        //
        //
        // })
        // this.state.data['description'] = this.props.item['description']
        // this.state.data['name'] = this.props.item['name'];
        // Object.keys(this.props.item['parameters']).forEach(key => {
        //     this.state.data[key] = this.props.item['parameters'][key]
        //     // console.log(data[key])
        // });
        // data[]
        // this.props.resourceTemplate.resourceParameters.map(key => {
        //     if (key.parameterType === "POINT_REFERENCE") {
        //         console.log(key['relatedResourceTemplateTableName']);
        //     }
        // })

        // console.log(this.props.item.parameters['point_a_coordinate']);
        // this.props.item.parameters['point_a_coordinate'].map(key => {
        //     console.log(key);
        // })
        return (
            <>
                <TableRow>
                    {this.props.headers.map((element, index) => {
                        let e;
                        if (element.columnName === 'name') {
                            e = (<Tooltip title="Show Item"><TableCell key={index}
                                                                       onClick={this.handleOpenView}
                                                                       style={{color: blue['A400']}}
                                                                       align="right">{this.state.data[element.columnName]}
                            </TableCell></Tooltip>)
                            // if (element.columnName === 'name') {
                            //     e = (<TableCell component={Link} key={index}
                            //                     to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                            //                     style={linkStyle} align="right">{data[element.columnName]}
                            //     </TableCell>)
                        } else if (element.columnName.endsWith('_ref_name')) {
                            let id = this.state.data[element.columnName.substring(0, element.columnName.length - 5)];
                            e = (<TableCell component={Link} key={index}
                                            to={`/resource/view/${this.props.relatedResourceTableName}/${id}`}
                                // to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                                            style={linkStyle} align="right">{this.state.data[element.columnName]}
                            </TableCell>)
                        } else if (element.columnName === 'photos') {
                            console.log(this.state.data[element.columnName])
                            e = (<TableCell align="right"><Image
                                src={this.state.data[element.columnName]}
                            />
                            </TableCell>)
                        } else if (element.columnName.endsWith('_coordinate')) {
                            e = (<TableCell align="right">
                                <Tooltip title={this.state.data[element.columnName].map(key => (

                                    <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>

                                ))}>
                                    <div>{`lat:${this.state.data[element.columnName][0]['lat']} lng:${this.state.data[element.columnName][0]['lng']}`}</div>
                                    {/*{*/}

                                    {/*this.state.data[element.columnName].map(key => (*/}

                                    {/*        `lat:${key['lat']} lng:${key['lng']}`*/}

                                    {/*))*/}

                                    {/*}*/}
                                </Tooltip>
                            </TableCell>)

                        } else {
                            // console.log(this.state.data);
                            e = (<TableCell key={index} align="right">{this.state.data[element.columnName]}
                            </TableCell>)
                        }
                        // console.log(this.state.data['point_a_coordinate']);
                        return e;
                    })
                    }
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" color="secondary" onClick={this.handleOpenEdit}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" color="primary" onClick={this.delete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </TableRow>

                <Dialog fullWidth
                        onClose={this.handleCloseEdit} aria-labelledby="simple-dialog-title"
                        open={this.state.openDialogEdit}>
                    <DialogTitle id="simple-dialog-title">Update {this.props.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordUpdate handleClose={this.handleCloseEdit}
                                          tableName={this.props.tableName}
                                          resourceTemplate={this.props.resourceTemplate}
                                          getRecordsData={this.props.getRecordsData}
                                          item={this.props.item}
                    />

                </Dialog>

                <Dialog fullWidth
                        open={this.state.openDialogView}
                        onClose={this.handleCloseView}
                >
                    <DialogTitle>{this.props.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordItemView handleClose={this.handleCloseView}
                                            tableName={this.props.tableName}
                                            item={this.props.item}
                                            resourceTemplate={this.props.resourceTemplate}
                                            headers={this.props.headers}
                                            data={this.state.data}
                    />
                </Dialog>
            </>
        );
    }
}

export default resourceRecordItem;