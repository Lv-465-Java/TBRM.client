import React, { Component } from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import { Button, Grid } from '@material-ui/core';

const style = {

    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-around",
    // alignItems: "flex-start",

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
        this.props.history.push("/resource/create");
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.goToCreateResource}>Create Resource</Button>
                <Grid container spacing={3}>
                    <Grid item xs>
                        1
        </Grid>
                    <Grid item xs={8}>
                        <div style={style}>
                            {this.state.resourceTemplates.map((item) =>
                                (<ResourceTemplateItem key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description} />)
                            )}
                        </div>
                    </Grid>
                    <Grid item xs>
                        3
        </Grid>
                </Grid>

            </div>
        );
    }
}

export default ResourceTemplateList;