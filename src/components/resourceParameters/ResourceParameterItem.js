import React, {Component} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../utils/axios";

class ResourceParameterItem extends Component {

    state = {
        id: this.props.item.id,
        columnName: this.props.item.columnName,
        name: this.props.item.name,
        parameterType: this.props.item.parameterType,
        pattern: this.props.item.pattern,
        resourceRelation: this.props.item.relatedResourceTemplateName
    };

    delete = () => {
        axios.delete(`/resource-template/${this.props.resTempId}/resource-parameter/${this.state.id}`).then(
            response => {
                this.props.history.push("/resource-template");
            }).catch(error => {
            console.dir(error.response.data);

        })

    }


    render() {
        return (
            <>
                <TableRow>
                    <TableCell align="right">{this.state.id}</TableCell>
                    <TableCell align="right">{this.state.columnName}</TableCell>
                    <TableCell align="right">{this.state.name}</TableCell>
                    <TableCell align="right">{this.state.parameterType}</TableCell>
                    <TableCell align="right">{this.state.pattern}</TableCell>
                    <TableCell align="right">{this.state.resourceRelation}</TableCell>
                    {/*<TableCell>*/}
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={this.delete}>
                               <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit">
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    {/*</TableCell>*/}


                </TableRow>
            </>
        );
    }
}

export default ResourceParameterItem;