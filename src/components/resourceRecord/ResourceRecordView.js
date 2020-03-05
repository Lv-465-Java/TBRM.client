import React, {Component} from 'react';
import axios from "../../utils/axios";
// import axios from "../../utils/axios";
import ResourceRecordList from "./ResourceRecordList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

// const gridStyles = {
//     marginLeft: 300
// }

class ResourceRecordView extends Component {

    state = {
        records: [],
        resourceTemplate: undefined,
        tableName: this.props.match.params.tableName,
        openDialog: false
    }

    getRecordsData = () => {
        axios.get(`/resource-template/resource/${this.state.tableName}`).then(response => {
            this.setState({records: response.data})
        })
    }

    getResourceTemplateData = () => {
        axios.get(`/resource-template/table/${this.state.tableName}`).then(response => {
            this.setState({resourceTemplate: response.data})
        })
    }
    handleClose = () => {
        this.setState({openDialog: false})
    }
    handleOpen = () => {
        this.setState({openDialog: true})
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
                    startIcon={<CheckCircleIcon/>}
                    onClick={this.handleOpen}>
                    Add record
                </Button>

                <Grid container spacing={3}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        {this.state.resourceTemplate &&
                        <ResourceRecordList
                            tableName={this.state.tableName}
                            records={this.state.records}
                            resourceTemplate={this.state.resourceTemplate}
                            getRecordData={this.getRecordsData}
                        />}
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.openDialog}>
                    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                    <ResourceRecordList
                        tableName={this.state.tableName}
                        records={this.state.records}
                        resourceTemplate={this.state.resourceTemplate}
                        getRecordData={this.getRecordsData}
                    />
                </Dialog>
            </div>
        );
    }
}

export default ResourceRecordView;