import React, { Component } from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import { Button, Grid, Box } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
    }

    getData = () => {
        axios.get('resource-template').then(response => {
            let resourceTemplates = response.data;
            this.setState({ resourceTemplates });
        })
    }

    componentDidMount() {
        this.getData();
    }

    goToCreateResource = () => {
        this.props.history.push("/resource-template/create");
    }

    goHome = () => {
        this.props.history.push("/home");
    }

    render() {
        return (
            <div>
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
                                            startIcon={<ArrowBackIosIcon />}
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
                                        item={item} />)
                                )}
                            </div>
                        </Grid>
                        <Grid item xs>
                            <Button
                                variant="contained"
                                style={buttonStyle}
                                onClick={this.goToCreateResource}>Create Resource</Button>
                        </Grid>
                    </Grid>
                </Auth>
            </div>
        );
    }
}

export default ResourceTemplateList;