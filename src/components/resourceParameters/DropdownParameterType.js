import React, {Component} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class DropdownParameterType extends Component {

    render() {
        return (
            <div>
                <Select value={this.props.parameterType} onChange={this.props.onChangeParameterType}>
                    {this.props.list.map(element => <MenuItem value={element}>{element}</MenuItem>)}
                    {/*<MenuItem value="POINT">Point</MenuItem>*/}
                    {/*<MenuItem value="RANGE">Rangesss</MenuItem>*/}
                    {/*<MenuItem value="coordinates">Coordinates</MenuItem>*/}
                </Select>
            </div>
        );
    }
}

export default DropdownParameterType;