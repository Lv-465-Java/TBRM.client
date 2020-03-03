import React, {Component} from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import {Box, Button, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {getUserRole} from '../../service/authService';
import Auth from '../../hoc/auth';

const style = {

    display: "flex",
    flexWrap: "wrap",
}

const gridStyle = {
    marginTop: 40
}
const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff'
}

class ResourceTemplateList extends Component {

    state = {
        resourceTemplates: []
    };

    getData = () => {
        axios.get('resource-template').then(response => {
            let resourceTemplates = response.data;
            this.setState({resourceTemplates});
        })
    };

    getAllPublishedTemplates = () => {
        axios.get('resource-template/published').then(response => {
            let resourceTemplates = response.data;
            this.setState({resourceTemplates});
        })
    };

    componentDidMount() {
        if (getUserRole() === "ROLE_MANAGER") {
            this.getData();
        } else {
            this.getAllPublishedTemplates();
        }
    }

    goToCreateResource = () => {
        this.props.history.push("/resource-template/create");
    };

    goHome = () => {
        this.props.history.push("/home");
    }

    render() {

        let userLinks = (getUserRole() === "ROLE_MANAGER") ?
            (
                <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={this.goToCreateResource}>Create Resource</Button>
            ) : (
                <div></div>
            )

        return (
            <Auth>
                <Grid container spacing={3} style={gridStyle}>
                    <Grid item xs>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Box mx="auto">
                                <Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<ArrowBackIosIcon/>}
                                        onClick={this.goHome}
                                    >Go Back</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <div style={style}>
                            {this.state.resourceTemplates.map((item) =>
                                (<ResourceTemplateItem key={item.id}
                                                       item={item}/>)
                            )}
                        </div>
                    </Grid>
                    <Grid item xs>
                        {userLinks}
                    </Grid>
                </Grid>
            </Auth>
        );
    }
}

export default ResourceTemplateList;