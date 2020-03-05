import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import axios from "../../utils/axios";
import TestMaps from "../resourceParameters/GoogleMap";


const mapStyle = {
    marginLeft: 300
}


class ResourceRecordItemView extends Component {

    state = {
        recordId: this.props.match.params.recordId,
        tableName: this.props.match.params.tableName,
        name: "",
        description: "",
        parameters: undefined
    };

    getData = () => {
        // axios.get(`/resource-template/resource/room/1`).then(
        axios.get(`/resource-template/resource/${this.state.tableName}/${this.state.recordId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name,
                    description: data.description,
                    parameters: data.parameters
                })
            }).catch(error => {
            console.dir(error.response.data);
        })
    };

    componentDidMount() {
        this.getData();
    }


    render() {
        return (
            <div>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.description}
                            </Typography>
                            {/*{this.state.parameters.map((element, index) =>*/}
                            {/*    <Typography key={index} variant="body2" color="textSecondary" component="p">${element} </Typography>*/}
                            {/* )}*/}


                        </CardContent>
                    </CardActionArea>
                </Card>
                <div style={mapStyle}>
                    <TestMaps parameters={this.state.parameters}/>
                </div>
            </div>
        );
    }
}

export default ResourceRecordItemView;