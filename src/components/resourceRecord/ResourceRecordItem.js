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


const linkStyle = {
    textDecoration: 'none',
    color: blue['A400']

}


class resourceRecordItem extends Component {

    state = {
        // id: this.props.item.id,
        // name: this.props.item.name,
        // description: this.props.item.description,
        // userId: this.props.item.userId,
        // parameters: this.props.item.parameters,

        headers: this.props.headers
    };


    delete = () => {
        axios.delete(`/resource-template/resource/${this.props.tableName}/${this.props.item.id}`).then(
            response => {
                this.props.getRecordsData();
            }).catch(error => {
            // console.dir(error.response.data);
        })
    };

    handleClose = () => {
        this.setState({openDialog: false})
    }
    handleOpen = () => {
        this.setState({openDialog: true})
    }


    render() {
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
        console.log(this.props.item.parameters)
        let data = {}
        data['description'] = this.props.item['description']
        data['name'] = this.props.item['name']
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

        Object.keys(this.props.item['parameters']).forEach(key => {
            data[key] = this.props.item['parameters'][key]
            console.log(data[key])
        })
        // data[]
        // this.props.resourceTemplate.resourceParameters.map(key => {
        //     if (key.parameterType === "POINT_REFERENCE") {
        //         console.log(key['relatedResourceTemplateTableName']);
        //     }
        // })
        return (

            <>
                <TableRow>
                    {this.props.headers.map((element, index) => {
                        let e;
                        if (element.columnName === 'name') {
                            e = (<TableCell component={Link} key={index}
                                            to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                                            style={linkStyle} align="right">{data[element.columnName]}
                            </TableCell>)
                        } else if (element.columnName.endsWith('_ref_name')) {
                            let id = data[element.columnName.substring(0, element.columnName.length - 5)];
                            e = (<TableCell component={Link} key={index}
                                            to={`/resource/view/${this.props.relatedResourceTableName}/${id}`}
                                // to={`/resource/view/${this.props.tableName}/${this.props.item['id']}`}
                                            style={linkStyle} align="right">{data[element.columnName]}
                            </TableCell>)
                        } else {
                            e = (<TableCell key={index} align="right">{data[element.columnName]}
                            </TableCell>)
                        }
                        return e;
                    })
                    }
                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" color="secondary" onClick={this.handleOpen}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" color="primary" onClick={this.delete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </TableRow>

                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.openDialog}>
                    <DialogTitle id="simple-dialog-title">Update {this.props.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordUpdate handleClose={this.handleClose}
                                          tableName={this.props.tableName}
                                          resourceTemplate={this.props.resourceTemplate}
                                          getRecordsData={this.props.getRecordsData}
                                          item={this.props.item}
                    />

                </Dialog>
            </>
        );
    }
}

export default resourceRecordItem;