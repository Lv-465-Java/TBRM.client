import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const style = {
    maxWidth: 345,
    minWidth: 300,
    margin: 10,

}

class ResourceTemplateItem extends Component{


    state = {
        id:	this.props.id,
        name: this.props.name,
        tableName:	this.props.tableName,
        description: this.props.description,
        isPublished: this.props.isPublished,
        userId:	this.props.userId,
        resourceParameters: this.props.resourceParameters
    }
    
    render(){
        return(
            <Link to={`/resource/update/${this.state.id}`} >
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
        </Link>
        );
    }
}

export default ResourceTemplateItem;