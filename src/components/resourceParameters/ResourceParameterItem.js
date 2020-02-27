import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../utils/axios";
import UpdateParameter from "./UpdateParameter";

class ResourceParameterItem extends Component {

    state = {
        id: this.props.item.id,
        columnName: this.props.item.columnName,
        name: this.props.item.name,
        parameterType: this.props.item.parameterType,
        pattern: this.props.item.pattern,
        resourceRelation: this.props.item.relatedResourceTemplateName,
        isNotEdit: true
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newData = {}
        if (this.props.item.name !== nextProps.item.name) {
            newData.name = nextProps.item.name
        }
        if (this.props.item.parameterType !== nextProps.item.parameterType) {
            newData.parameterType = nextProps.item.parameterType
        }
        if (this.props.item.pattern !== nextProps.item.pattern) {
            newData.pattern = nextProps.item.pattern
        }
        if (this.props.item.resourceRelation !== nextProps.item.relatedResourceTemplateName) {
            newData.resourceRelation = nextProps.item.relatedResourceTemplateName
        }
        this.setState({...newData})
    }

    delete = () => {
        axios.delete(`/resource-template/${this.props.resTempId}/resource-parameter/${this.state.id}`).then(
            response => {
                // this.props.history.push("/resource-template");
                this.props.getData();
                // this.props.getData();
            }).catch(error => {
            // console.dir(error.response.data);

        })

    }
    onChangeEdit = () => {
        this.setState({isNotEdit: !this.state.isNotEdit})
    };


    render() {

        let element = this.state.isNotEdit ? (<><TableCell align="right">{this.state.name}</TableCell>
            <TableCell align="right">{this.state.parameterType}</TableCell>
            {/*<TableCell align="right">{this.state.pattern}</TableCell>*/}
            <TableCell align="right">{this.state.resourceRelation}</TableCell>

            <Tooltip title="Delete">
                <IconButton aria-label="delete" color="primary" onClick={this.delete}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
                <IconButton aria-label="edit" color="secondary" onClick={this.onChangeEdit}>
                    <EditIcon/>
                </IconButton>
            </Tooltip></>) : (<UpdateParameter getData={this.props.getData}
                                               resTempId={this.props.resTempId}
                                               cancelClick={this.onChangeEdit}
                                               id={this.state.id}
                                               name={this.state.name}
                                               parameterType={this.state.parameterType}
        />);
        console.log(this.state)
        return (
            <>
                <TableRow>
                    {/*<TableCell align="right">{this.state.id}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.columnName}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.name}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.parameterType}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.pattern}</TableCell>*/}
                    {/*<TableCell align="right">{this.state.resourceRelation}</TableCell>*/}

                    {/*    <Tooltip title="Delete">*/}
                    {/*        <IconButton aria-label="delete" onClick={this.delete}>*/}
                    {/*           <DeleteIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Tooltip title="Edit">*/}
                    {/*        <IconButton aria-label="edit">*/}
                    {/*            <EditIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*<CreateParameter getData={this.getData}*/}
                    {/*                 resTempId={this.state.resTempId}/>*/}
                    {element}

                </TableRow>
            </>
        );
    }
}

export default ResourceParameterItem;