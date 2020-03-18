import React, {Component} from 'react';
import ResourceRecordDropdown from "../ResourceRecordDropdown";
import {FormControl} from "@material-ui/core";

class PointReference extends Component {

    render() {
        return (
            <div>
                <FormControl>
                    <ResourceRecordDropdown className={"referenceDropdown"}
                                            relatedResourceTableName={this.props.relatedResourceTableName}
                                            onChangePointReference={this.props.setData}
                        // onChangePointReferenceName={this.props.setData}
                                            columnName={this.props.columnName}/>
                </FormControl>
            </div>
        );
    }
}

export default PointReference;