import React, { Component } from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';

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
    
    render(){
        return(
            <div>
                {this.state.resourceTemplates.map((item) => 
                    (<ResourceTemplateItem id = {item.id} name = {item.name}/>)
                )}
            </div>
        );
    }
}

export default ResourceTemplateList;