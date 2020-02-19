import React, { Component } from 'react';

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
            <div>
                {this.state.name}
            </div>
        );
    }
}

export default ResourceTemplateItem;