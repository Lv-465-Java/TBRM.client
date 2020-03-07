import React, {Component} from 'react';
import axios from "../../utils/axios";
// import axios from "../../utils/axios";
import ResourceRecordList from "./ResourceRecordList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ResourceRecordCreate from "./ResourceRecordCreate";

// const gridStyles = {
//     marginLeft: 300
// }

class ResourceRecordView extends Component {

    state = {
        records: [],
        resourceTemplate: "",
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
        // function relatedResourceTableName() {
        //     this.state.resourceTemplate.resourceParameters.map(key => {
        //         if (key.parameterType === "POINT_REFERENCE") {
        //             return key['relatedResourceTemplateTableName'];
        //         }
        //     })
        // }
        return (
            <div>
                <div>
                    <h1>{this.state.resourceTemplate.name}</h1>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircleIcon/>}
                    onClick={this.handleOpen}>
                    Add record
                </Button>

                <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        {this.state.resourceTemplate &&
                        <ResourceRecordList
                            tableName={this.state.tableName}
                            records={this.state.records}
                            resourceTemplate={this.state.resourceTemplate}
                            getRecordsData={this.getRecordsData}
                        />}
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.openDialog}>
                    <DialogTitle id="simple-dialog-title">Create new {this.state.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordCreate handleClose={this.handleClose}
                                          tableName={this.state.tableName}
                                          resourceTemplate={this.state.resourceTemplate}
                                          // relatedResourceTableName={relatedResourceTableName}
                                          getRecordsData={this.getRecordsData}
                    />

                </Dialog>
            </div>
        );
    }
}

export default ResourceRecordView;