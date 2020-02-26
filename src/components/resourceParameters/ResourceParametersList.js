import React, {Component} from 'react';
import axios from "../../utils/axios";
import ResourceTemplateItem from "../resourceTemplate/resourceTemplateItem";
import {Grid} from "@material-ui/core";
import ResourceParameterItem from "./ResourceParameterItem";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

class ResourceParametersList extends Component {

    render() {
        console.log("ResourceParametersList")
        return (
            <div>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/*<TableCell>Id</TableCell>*/}
                                {/*<TableCell align="right">ColumnName</TableCell>*/}
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">ParameterType</TableCell>
                                <TableCell align="right">Pattern</TableCell>
                                <TableCell align="right">Related Template</TableCell>
                                {/*<TableCell align="right">1</TableCell>*/}
                                {/*<TableCell align="right">2</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.resourceParameters.map((item) =>
                                (<ResourceParameterItem key={item.id}
                                                        item={item}
                                                        resTempId={this.props.resTempId}
                                                        getData={this.props.getData}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ResourceParametersList;