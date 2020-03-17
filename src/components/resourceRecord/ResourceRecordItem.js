import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
import Image from 'material-ui-image'
import MyDialog from "../resourceTemplate/popUp";

class resourceRecordItem extends Component {

    state = {
        headers: this.props.headers,
        data: {},
        openDialogEdit: false,
        openDialogView: false,
        open: false
    };


    delete = () => {
        axios.delete(`/resource/${this.props.tableName}/${this.props.item.id}`).then(
            response => {

                this.props.getRecordsData();

            }).catch(error => {

            console.dir(error.response.data);
        })
    };

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
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
        });
    };

    render() {
        this.getRecordValues();
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
                        } else if (element.columnName.endsWith('_ref_name')) {
                            let id = this.state.data[element.columnName.substring(0, element.columnName.length - 5)];
                            e = (<TableCell key={index}
                                // component={Link}
                                // to={`/resource/view/${this.props.relatedResourceTableName}/${id}`}
                                // to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                                //             style={linkStyle}
                                            align="right">{this.state.data[element.columnName]}
                            </TableCell>)
                        }
                        // else if (element.columnName === 'photos') {
                        //     e = (<TableCell align="right"><Image
                        //         src={this.state.data[element.columnName]}
                        //     />
                        //     </TableCell>)
                        // }
                        else if (element.columnName.endsWith('_coordinate')) {
                            e = (<TableCell align="right">
                                <Tooltip title={this.state.data[element.columnName].map(key => (

                                    <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>

                                ))}>
                                    <div>{`lat:${this.state.data[element.columnName][0]['lat']} lng:${this.state.data[element.columnName][0]['lng']}`}</div>
                                </Tooltip>
                            </TableCell>)

                        } else {
                            e = (<TableCell key={index} align="right">{this.state.data[element.columnName]}
                            </TableCell>)
                        }
                        return e;
                    })
                    }
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" color="secondary" onClick={this.handleOpenEdit}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" color="primary" onClick={this.handleClickOpen}>
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
                    <ResourceRecordItemView handleClose={this.handleCloseView}
                                            tableName={this.props.tableName}
                                            item={this.props.item}
                                            resourceTemplate={this.props.resourceTemplate}
                                            headers={this.props.headers}
                                            data={this.state.data}
                    />
                </Dialog>
                <MyDialog delete={this.delete}
                          open={this.state.open}
                          handleClickOpen={this.handleClickOpen}
                          handleClose={this.handleClose}
                          title="Delete resource"
                          msg="Are you sure you want to delete this resource?" />
            </>
        );
    }
}

export default resourceRecordItem;