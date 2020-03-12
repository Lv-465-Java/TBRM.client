import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import GoogleMap from "../resourceParameters/GoogleMap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";


const dialogContentStyle = {
    display: "flex"
}

const cardStyle = {
    maxWidth: 700,
    minWidth: 250,
    marginLeft: 270,
}


class ResourceRecordItemView extends Component {

    state = {
        id: this.props.item.id,
        // recordId: this.props.match.params.recordId,
        tableName: this.props.tableName,
        name: this.props.item.name,
        description: this.props.item.description,
        parameters: this.props.item.parameters,
        headers: this.props.headers,
        data: this.props.data,
        coordinates: undefined
        // parameters: undefined
    }


    // getData = () => {
    //     // axios.get(`/resource-template/resource/room/1`).then(
    //     axios.get(`/resource-template/resource/${this.state.tableName}/${this.state.recordId}`).then(
    //         response => {
    //             let data = response.data;
    //             this.setState({
    //                 name: data.name,
    //                 description: data.description,
    //                 parameters: data.parameters
    //                 // parameters: data.parameters
    //             })
    //         }).catch(error => {
    //         // console.dir(error.response.data);
    //     })
    // };

    // componentDidMount() {
    //     this.getData();
    // }
    getRecordValues = () => {
        this.state.data['description'] = this.props.item['description']
        this.state.data['name'] = this.props.item['name'];
        Object.keys(this.props.item['parameters']).forEach(key => {
            // console.log(this.props.item['parameters'][key]);
            // console.log(key.endsWith('_coordinate'));
            if (key.endsWith('_coordinate')) {
                this.state.coordinates = this.props.item['parameters'][key];
                console.log(this.state.coordinates);
            }
            this.state.data[key] = this.props.item['parameters'][key]
            // console.log(data[key])
        });
    }

    render() {
        this.getRecordValues();
        // let value = {}
        // Object.keys(this.state.parameters).forEach(key => {
        //     value[key] = this.state.parameters[key];
        //     if (key === 'coordinates') {
        //         console.log(value[key]);
        //     }
        //     console.log(value[key]);
        // })
        // let googleMap = (this.state.para
        console.log(this.state.coordinates);
        let googleMap = (this.state.coordinates !== undefined) ?
            // let googleMap = (!this.state.coordinates.isEmpty) ?
            (<div>
                <GoogleMap coordinates={this.state.coordinates}/>
            </div>) : (
                <div>

                </div>);
        // this.state.data['description'] = this.props.item['description']
        // this.state.data['name'] = this.props.item['name'];
        // Object.keys(this.props.item['parameters']).forEach(key => {
        //     this.state.data[key] = this.props.item['parameters'][key]
        //     // console.log(data[key])
        // });
        console.log(this.state.headers);
        return (

            <div>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            {this.props.resourceTemplate.name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={this.props.handleClose}>
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={dialogContentStyle}>


                    <List>
                        {/*<ListItem container>*/}
                        {/*    <ListItemText align="center" secondary="Name" primary={this.state.name}/>*/}
                        {/*</ListItem>*/}
                        {/*<Divider/>*/}
                        {/*<ListItem container>*/}
                        {/*    <ListItemText align="center" secondary="Description" primary={this.state.description}/>*/}
                        {/*</ListItem>*/}

                        {this.state.headers.map((element, index) => {
                            let e;
                            if (element.columnName.endsWith('_coordinate')) {
                                // e = (<ListItem container>
                                //     <ListItemText key={index} align="center" primary={element.name}
                                //                   secondary='sssdads'/>
                                //                   {/*secondary={this.state.data[element.columnName]}/>*/}
                                // </ListItem>)
                                e = (<ListItem container>
                                        {/*// <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>*/}

                                        <ListItemText key={index} align="center" primary={element.name}
                                                      secondary={this.state.data[element.columnName].map(key => (
                                                          <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>
                                                      ))}/>

                                    </ListItem>
                                );
                                // e = (<ListItem container>
                                //         {this.state.data[element.columnName].map(key => (
                                //                 // <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>
                                //
                                //                 <ListItemText key={index} align="center" primary={element.name}
                                //                               secondary={`lat:${key['lat']} lng:${key['lng']}`}/>
                                //             )
                                //         )}
                                //     </ListItem>
                                // );
                            } else {
                                e = (<ListItem container>
                                        <ListItemText key={index} align="center" primary={element.name}
                                                      secondary={this.state.data[element.columnName]}/>
                                    </ListItem>
                                );
                            }
                            return e;
                        })
                        }
                    </List>

                    {/*<Card style={cardStyle}>*/}
                    {/*    <CardActionArea>*/}
                    {/*        <CardContent>*/}
                    {/*            <Typography gutterBottom variant="h5" component="h2">*/}
                    {/*                {this.state.name}*/}
                    {/*            </Typography>*/}
                    {/*            <Typography variant="body2" color="textSecondary" component="p">*/}
                    {/*                {this.state.description}*/}
                    {/*            </Typography>*/}

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


                    {/*        </CardContent>*/}
                    {/*    </CardActionArea>*/}
                    {/*</Card>*/}
                    {googleMap}</div>
            </div>
        );
    }
}

export default ResourceRecordItemView;