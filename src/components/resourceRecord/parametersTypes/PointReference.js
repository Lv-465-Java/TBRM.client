import React, {Component} from 'react';
import ResourceRecordDropdown from "../ResourceRecordDropdown";
import {FormControl} from "@material-ui/core";

class PointReference extends Component {

    // onChangePointReference = (event) => {
    //     this.props.setData(this.props.columnName, parseInt(event.target.value))
    // };

    render() {
        return (
            <div>
                <FormControl>
                    <ResourceRecordDropdown relatedResourceTableName={this.props.relatedResourceTableName}
                                            onChangePointReference={this.props.setData}
                                            // onChangePointReferenceName={this.props.setData}
                                            columnName={this.props.columnName}/>
                    {/*<Select value={this.props.parameterType} onChange={this.state.onChangePointReference}>*/}
                    {/*    {this.props.list.map(element => <MenuItem key={element} value={element}>{element}</MenuItem>)}*/}
                    {/*</Select>*/}
                </FormControl>
            </div>
        );
    }
}

export default PointReference;