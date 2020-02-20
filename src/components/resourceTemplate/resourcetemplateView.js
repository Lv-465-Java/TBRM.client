import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import axios from '../../utils/axios';

const style = {
    maxWidth: 750,
    minWidth: 500,
    marginTop: 40,

}

class ResourceTemplateView extends Component{


    state = {
        resTempId: this.props.match.params.id,
        name: this.props.name,
        tableName:	this.props.tableName,
        description: this.props.description,
        isPublished: this.props.isPublished,
        userId:	this.props.userId,
        resourceParameters: this.props.resourceParameters
    }

    getData = () => {
        axios.get(`/resource-template/${this.state.resTempId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name:  data.name,
                    oldName: data.name,
                    description: data.description,
                    oldDescription: data.description
                })
            }).catch( error => {
                console.dir(error.response.data);

            })
        
    }

    componentDidMount(){
        this.getData();
    }
    
    render(){
        return(
            <Grid container spacing={3}>
        <Grid item xs>
          1
        </Grid>
        <Grid item xs={6}>
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
            </Card>
        </Grid>
        <Grid item xs>
          3
        </Grid>
      </Grid>
        );
    }
}

export default ResourceTemplateView;