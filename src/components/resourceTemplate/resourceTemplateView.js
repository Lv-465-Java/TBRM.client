import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {Grid, Box, Hidden} from '@material-ui/core';
import {getUserRole} from '../../service/authService';
import Alert from '@material-ui/lab/Alert';
import axios from '../../utils/axios';
import CreateParameter from "../resourceParameters/CreateParameter";
import ResourceParametersList from "../resourceParameters/ResourceParametersList";
import MyDialog from "./popUp"
import Auth from '../../hoc/auth';

const style = {
    maxWidth: 800,
    minWidth: 500,
    marginTop: 40,

}

const gridStyle = {
    marginTop: 40
}

const cardStyle = {
    maxWidth: 100,
    minWidth: 1000,
    marginLeft: 100
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const linkStyle = {
    textDecoration: 'none'
}

class ResourceTemplateView extends Component {

    state = {
        resTempId: this.props.match.params.id,
        name: "",
        tableName: "",
        description: "",
        isPublished: "",
        userId: "",
        open: false,
        resourceParameters: []
    }

    classes = () => {
        useStyles();
    }

    getData = () => {
        axios.get(`/resource-template/${this.state.resTempId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name,
                    description: data.description,
                    isPublished: data.isPublished,
                    resourceParameters: data.resourceParameters
                })
            }).catch(error => {
            console.dir(error.response.data);

        })

    }

    publish = () => {
        let body = {'isPublished': true};

        axios.put(`/resource-template/${this.state.resTempId}/publish`, body).then(
            response => {
                this.setState({isPublished: true});
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
            console.dir(error.response.data);
        })
    };

    unpublish = () => {
        let body = {'isPublished': false};

        axios.put(`/resource-template/${this.state.resTempId}/publish`, body).then(
            response => {
                this.setState({isPublished: false});
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(error.response.data.message);
        })
    };

    delete = () => {
        axios.delete(`/resource-template/${this.state.resTempId}`).then(
            response => {
                this.props.history.push("/resource-template");
            }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message,
                open: false
            });
            console.log(error.response.data.message);
        })

    }

    goBack = () => {
        this.props.history.push("/resource-template");
    }

    isPublished = () => {
        return this.state.isPublished ? "Published" : "Not Published";
    }

    showLinks = () => {
        if (getUserRole() === "ROLE_MANAGER") {
            return false;
        } else {
            return true;
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleClickOpen = () => {
        console.log("open")
        this.setState({open: true}, () => console.log(this.state));
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        let publishButton = (this.state.isPublished === false) ? (
            <Box mt={5}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircleIcon/>}
                    style={useStyles.button}
                    onClick={this.publish}
                    disabled={this.state.resourceParameters.length === 0}
                >Publish</Button>
            </Box>) : (
            <Box mt={5}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ReplayIcon/>}
                    style={useStyles.button}
                    onClick={this.unpublish}
                >Cancel publish</Button>
            </Box>)

        return (
            <Auth>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={gridStyle}>
                            <Box mx="auto">
                                <Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<ArrowBackIosIcon/>}
                                        onClick={this.goBack}
                                    >Go Back</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={7}>
                        <Card style={style}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.state.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {this.state.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="h2">
                                    {this.isPublished()}
                                    {this.state.errorMessage &&
                                    <Alert severity="error">{this.state.errorMessage}</Alert>}
                                </Typography>
                            </CardContent>
                        </Card>
                        {/*<CreateParameter getData={this.getData}*/}
                        {/*    resTempId={this.state.resTempId} />*/}
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              style={gridStyle}
                        ><Hidden mdUp={this.showLinks()}>
                            <Box mx="auto">
                                <Box>
                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                        {popupState => (
                                            <React.Fragment>
                                                <Button variant="contained"
                                                        color="primary" {...bindTrigger(popupState)}>
                                                    Permissions
                                                </Button>
                                                <Menu {...bindMenu(popupState)}>
                                                    <Link to={`/resource-template/permission/${this.state.resTempId}`}
                                                          style={linkStyle}>
                                                        <MenuItem onClick={popupState.close}>View Permissions</MenuItem>
                                                    </Link>
                                                    <Link
                                                        to={`/resource-template/permission/add/${this.state.resTempId}`}
                                                        style={linkStyle}>
                                                        <MenuItem onClick={popupState.close}>Add/Update
                                                            Permission</MenuItem>
                                                    </Link>
                                                    <Link
                                                        to={`/resource-template/permission/owner/${this.state.resTempId}`}
                                                        style={linkStyle}>
                                                        <MenuItem onClick={popupState.close}>Change Owner</MenuItem>
                                                    </Link>
                                                    <Link
                                                        to={`/resource-template/permission/remove/${this.state.resTempId}`}
                                                        style={linkStyle}>
                                                        <MenuItem onClick={popupState.close}>Delete
                                                            Permission</MenuItem>
                                                    </Link>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </Box>
                                <Box mt={5}>
                                    <Link to={`/resource-template/update/${this.state.resTempId}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon/>}
                                        >Update</Button>
                                    </Link>
                                </Box>
                                <Box mt={5}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon/>}
                                        style={useStyles.button}
                                        onClick={this.delete}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                {publishButton}
                            </Box>
                        </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Resource Parameters</h3>
                        <Card style={cardStyle}>
                            <CardContent>
                                <CreateParameter getData={this.getData}
                                                 resTempId={this.state.resTempId}/>
                            </CardContent>
                            <CardContent>
                                <ResourceParametersList resourceParameters={this.state.resourceParameters}
                                                        resTempId={this.state.resTempId}
                                                        getData={this.getData}/>
                            </CardContent>
                        </Card>

                    </Grid>
                    <MyDialog
                        delete={this.delete}
                        open={this.state.open}
                        handleClickOpen={this.handleClickOpen}
                        handleClose={this.handleClose}
                        title="Delete resource template"
                        msg="Are you sure you want to delete this resource template?"/>
                </Grid>
            </Auth>
        );
    }
}

export default ResourceTemplateView;