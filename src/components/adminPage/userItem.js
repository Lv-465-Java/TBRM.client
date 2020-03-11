import axios from "../../utils/axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const cardStyle = {
    maxWidth: 300,
    minWidth: 250,
    margin: 10,

}
class UserItem extends Component {

    state = {
        to_timestamp: this.props.item.to_timestamp,
        firstName: this.props.item.first_name,
        lastName: this.props.item.last_name,
        email: this.props.item.email,
        phone: this.props.item.phone,
        password: this.props.item.password,
        enabled: this.props.item.enabled,
        imageUrl: this.props.item.imageUrl,
        role:this.props.item.role
    }


    render(){
        return(
            <Grid>
                <Card style={cardStyle}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.to_timestamp}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.firstName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.lastName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.phone}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }

}
export default UserItem;