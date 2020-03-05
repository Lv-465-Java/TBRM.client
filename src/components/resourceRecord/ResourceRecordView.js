import React, {Component} from 'react';
import axios from "../../utils/axios";
// import axios from "../../utils/axios";
import ResourceRecordList from "./ResourceRecordList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";

class ResourceRecordView extends Component {

    state = {
        records: [],
        resourceTemplate: undefined,

    }
    getRecordsData = () => {
        let tableName = this.props.match.params.tableName;
        axios.get(`/resource-template/resource/${tableName}`).then(response => {
            this.setState({records: response.data})
        })
    }

    getResourceTemplateData = () => {
        let tableName = this.props.match.params.tableName;
        axios.get(`/resource-template/table/${tableName}`).then(response => {
            this.setState({resourceTemplate: response.data})
        })
    }

    componentDidMount() {
        this.getRecordsData();
        this.getResourceTemplateData();
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircleIcon/>}>
                    Add record
                </Button>
                {this.state.resourceTemplate &&
                <ResourceRecordList
                    records={this.state.records}
                    resourceTemplate={this.state.resourceTemplate}
                    getRecordData={this.getRecordsData}
                />}
            </div>
        );
    }
}

export default ResourceRecordView;