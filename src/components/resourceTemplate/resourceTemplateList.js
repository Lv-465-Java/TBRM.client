import React, { Component } from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import { Button } from '@material-ui/core';

class ResourceTemplateList extends Component{

    state = {
        resourceTemplates: []
    }

    getData = () => {
        axios.get('resource-template').then(response => {
            let resourceTemplates = response.data;
            this.setState({resourceTemplates});
        })
    }

    componentDidMount(){
        this.getData();
    }

    goToCreateResource =() => {
        this.props.history.push("/resource/create");
    }
    
    render(){
        return(
            <div>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={this.goToCreateResource}>Create Resource</Button>
                {this.state.resourceTemplates.map((item) => 
                    (<ResourceTemplateItem key={item.id} id = {item.id} name = {item.name}/>)
                )}
            </div>
        );
    }
}

export default ResourceTemplateList;