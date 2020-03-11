import React, {Component} from 'react';
import axios from "../../utils/axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const style = {
    marginTop: 30,
    width: 300
}


class ResourceRecordDropdown extends Component {


    state = {
        // records: [],
        relatedResourceTableName: this.props.relatedResourceTableName
    };

    getRecordsData = () => {
        axios.get(`/resource-template/resource/${this.state.relatedResourceTableName}`).then(response => {
            this.setState({records: response.data})
        })
    }

    componentDidMount() {
        this.getRecordsData();
    }

    // onChangeId = (ob, value) => {
    //     if (value != null) {
    //         this.props.onChangePointReference(this.props.columnName.concat("_ref"), value.id);
    //     }
    // };
    // onChangeName = (ob, value) => {
    //     if (value != null) {
    //         this.props.onChangePointReference(this.props.columnName.concat("_ref_name"), value.name)
    //     }
    // };

    onChange = (ob, value) => {
        if (value != null) {
            this.props.onChangePointReference(this.props.columnName.concat("_ref_name"), value.name);
            // this.props.onChangePointReferenceName(this.props.columnName.concat("_ref"), value.name)
        }
    };

    render() {
            // console.log(this.props.columnName);
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.records}
                    getOptionLabel={option => option.name}
                    onChange={this.onChange}
                    style={style}
                    renderInput={params => <TextField {...params} label="Related Resource Records" variant="outlined" />}
                />
            </div>
        );
    }
}

export default ResourceRecordDropdown;