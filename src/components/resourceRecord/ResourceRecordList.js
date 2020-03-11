import React, {Component} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import ResourceRecordItem from "./ResourceRecordItem";

class ResourceRecordList extends Component {
    state = {
        headers: [],
        data: this.props.records
    }

    componentDidMount() {
        let headers = [
            {name: "Name", columnName: "name"},
            {name: "Description", columnName: "description"}];
        this.props.resourceTemplate.resourceParameters.forEach(element => {
            if (element.parameterType === "RANGE_DOUBLE") {
                // headers.push({
                //     name: element.name,
                //     columnName: [element.columnName+"_from", element.columnName+"_to"]
                // });


                headers.push({name: element.name+"_from", columnName: element.columnName+"_from"});
                headers.push({name: element.name+"_to", columnName: element.columnName+"_to"})
            } else if (element.parameterType === "POINT_REFERENCE") {
                headers.push({name: element.name, columnName: element.columnName + "_ref"})
            } else {
                headers.push({name: element.name, columnName: element.columnName})
            }
        });
        this.setState({headers: headers});
    }

    render() {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <caption>A basic table example with a caption</caption>
                        <TableHead>
                            <TableRow>
                                {this.state.headers.map(element => <TableCell align="right">{element.name}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map((item) =>
                                (<ResourceRecordItem key={item.id}
                                                     item={item}
                                                     headers={this.state.headers}/>)
                            )}
                            {/*{rows.map(row => (*/}
                            {/*    <TableRow key={row.name}>*/}
                            {/*        <TableCell component="th" scope="row">*/}
                            {/*            {row.name}*/}
                            {/*        </TableCell>*/}
                            {/*        <TableCell align="right">{row.calories}</TableCell>*/}
                            {/*        <TableCell align="right">{row.fat}</TableCell>*/}
                            {/*        <TableCell align="right">{row.carbs}</TableCell>*/}
                            {/*        <TableCell align="right">{row.protein}</TableCell>*/}
                            {/*    </TableRow>*/}
                            {/*))}*/}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ResourceRecordList;