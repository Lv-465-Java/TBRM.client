import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import axios from "../../utils/axios";
import GoogleMap from "../resourceParameters/GoogleMap";


const mapStyle = {
    marginLeft: 300
}

const cardStyle = {
    maxWidth: 700,
    minWidth: 250,
    marginLeft: 270,


}


class ResourceRecordItemView extends Component {

    state = {
        recordId: this.props.match.params.recordId,
        tableName: this.props.match.params.tableName,
        name: "",
        description: "",
        parameters: {}
        // parameters: undefined
    }


    getData = () => {
        // axios.get(`/resource-template/resource/room/1`).then(
        axios.get(`/resource-template/resource/${this.state.tableName}/${this.state.recordId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name,
                    description: data.description,
                    parameters: data.parameters
                    // parameters: data.parameters
                })
            }).catch(error => {
            // console.dir(error.response.data);
        })
    };

    componentDidMount() {
        this.getData();
    }


    render() {
        // let value = {}
        // Object.keys(this.state.parameters).forEach(key => {
        //     value[key] = this.state.parameters[key];
        //     if (key === 'coordinates') {
        //         console.log(value[key]);
        //     }
        //     console.log(value[key]);
        // })
        // let googleMap = (this.state.para

        let googleMap = (this.state.parameters['coordinates'] !== undefined) ?
            (<div style={mapStyle}>
                <GoogleMap parameters={this.state.parameters}/>
            </div>) : (
                <div>

                </div>);
        return (
            <div>
                <Card style={cardStyle}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.description}
                            </Typography>

                            {/*{this.state.parameters.map((element, index) =>*/}
                            {/*    <Typography key={index}>{element}*/}
                            {/*    </Typography>)}*/}

                            {/*{Object.keys(this.state.parameters).map(key =><Typography key={key}*/}
                            {/*                                                           variant="body2"*/}
                            {/*                                                           color="textSecondary"*/}
                            {/*                                                           component="p"> {key}: {value[key]}</Typography>)}*/}


                            {/*{this.state.map((element, index) =>*/}
                            {/*    <TableCell key={index} align="right">{data[element.columnName]}*/}
                            {/*    </TableCell>)}*/}
                            {/*{this.state.parameters.map(element => <Typography key={element}*/}
                            {/*                                                  align="right">{element.name}</Typography>)}*/}
                            {/*{this.state.parameters.map(element => <TableCell key={element.name}*/}
                            {/*                                              align="right">{element.name}</TableCell>)}*/}

                            {/*{this.state.map((element, index) =>*/}
                            {/*    <TableCell key={index} align="right">{data[element.columnName]}*/}
                            {/*    </TableCell>)}*/}

                            {/*{this.state.parameters.map((element, index) =>*/}
                            {/*    <Typography key={index} variant="body2" color="textSecondary" component="p">${element} </Typography>*/}
                            {/* )}*/}
                            {/*{this.state.parameters.map((item) =>*/}
                            {/*    (<Typography key={item.id}*/}
                            {/*                            item={item}*/}
                            {/*                            resTempId={this.props.resTempId}*/}
                            {/*                 getData={this.props.getData}>{item}</Typography>)*/}
                            {/*)}*/}


                        </CardContent>
                    </CardActionArea>
                </Card>
                {googleMap}
            </div>
        );
    }
}

export default ResourceRecordItemView;