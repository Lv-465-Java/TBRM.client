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
};

class ResourceRecordItemView extends Component {

    state = {
        id: this.props.item.id,
        tableName: this.props.tableName,
        name: this.props.item.name,
        description: this.props.item.description,
        parameters: this.props.item.parameters,
        headers: this.props.headers,
        data: this.props.data,
        coordinates: undefined
        // parameters: undefined
    };

    getRecordValues = () => {
        this.state.data['description'] = this.props.item['description']
        this.state.data['name'] = this.props.item['name'];
        Object.keys(this.props.item['parameters']).forEach(key => {
            if (key.endsWith('_coordinate')) {
                this.state.coordinates = this.props.item['parameters'][key];
                console.log(this.state.coordinates);
            }
            this.state.data[key] = this.props.item['parameters'][key]
        });
    };

    render() {
        this.getRecordValues();
        console.log(this.state.coordinates);
        let googleMap = (this.state.coordinates !== undefined) ?
            (<div>
                <GoogleMap coordinates={this.state.coordinates}/>
            </div>) : (
                <div>

                </div>);
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
                        {this.state.headers.map((element, index) => {
                            let e;
                            if (element.columnName.endsWith('_coordinate')) {
                                e = (<ListItem container>
                                        <ListItemText key={index} align="center" primary={element.name}
                                                      secondary={this.state.data[element.columnName].map(key => (
                                                          <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>
                                                      ))}/>

                                    </ListItem>
                                );
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
                    {googleMap}</div>
            </div>
        );
    }
}

export default ResourceRecordItemView;