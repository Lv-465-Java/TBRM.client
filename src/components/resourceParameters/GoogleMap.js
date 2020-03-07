import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker, Polygon} from 'google-maps-react';
import axios from "../../utils/axios";


const mapStyles = {
    width: '50%',
    height: '50%',
};

class GoogleMap extends Component {

    // state = {
    //     name: "",
    //     description: "",
    //     parameters: []
    // }

    // getData = () => {
    //     axios.get(`/resource-template/resource/building/2`).then(
    //         // axios.get(`/resource-template/resource/${this.state.tableName}/${this.state.id}`).then(
    //         response => {
    //             let data = response.data;
    //             this.setState({
    //                 name: data.name,
    //                 description: data.description,
    //                 parameters: data.parameters
    //             })
    //         }).catch(error => {
    //         console.dir(error.response.data);
    //
    //     })
    //
    // };

    // componentDidMount() {
    //     this.getData();
    // }

    render() {
        // const triangleCoords = [
        //
        //     {lat: 49.822182, lng: 23.984633},
        //
        //     {lat: 49.823013, lng: 23.984948},
        //     {lat: 49.822846, lng: 23.986034},
        //     {lat: 49.822022, lng: 23.985622},
        //     // {lat: 49.822182, lng: 23.984633},
        // ];

        let element = undefined;
        if (this.props.parameters !== undefined){
            if (this.props.parameters["coordinates"].length > 1) {
                element = (<Polygon paths={this.props.parameters["coordinates"]}/>);
            }  else {
                element = (<Marker
                    position={this.props.parameters["coordinates"][0]}/>)
            }
        }

        // let initialCenter = undefined;
        // if (this.props.parameters !== undefined){
        //     initialCenter = this.props.parameters["coordinates"][0];
        // }

        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={this.props.parameters["coordinates"][0]}
                    // initialCenter={{lat: 49.822182, lng: 23.984633}}
                    // initialCenter={initialCenter}
                >
                    {element}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_API_KEY
})(GoogleMap);
