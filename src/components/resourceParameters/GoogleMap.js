import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker, Polygon} from 'google-maps-react';


const mapStyles = {
    width: '35%',
    height: '35%',
};

class GoogleMap extends Component {

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
        if (this.props.coordinates !== undefined){
            if (this.props.coordinates.length > 1) {
                element = (<Polygon paths={this.props.coordinates}/>);
            }  else {
                element = (<Marker
                    position={this.props.coordinates[0]}/>)
            }
        }

        // alert(JSON.stringify(this.props.coordinates[0]));
        return (

            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={this.props.coordinates[0]}
                    center={this.props.coordinates[0]}
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
