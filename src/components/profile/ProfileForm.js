import React, {Component} from "react";
import axios from "../../utils/axios";
import {Box, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CreateParameter from "../resourceParameters/CreateParameter";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";

const gridStyles = {
    marginTop: 30
}
const style = {
    maxWidth: 800,
    minWidth: 500,
    marginTop: 40,

}
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

class ProfileForm extends Component {
    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        phone: this.props.phone
    }

    getData = () => {
        axios.get(`/profile`).then(
            response => {
                console.log(response.data);
                let data = response.data;
                this.setState({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    enabled: data.enabled
                })
            }).catch(error => {
            console.dir(error.response.data);

        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}></Grid>


                    <Grid item xs={5}>

                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.firstName}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.state.lastName}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.state.email}
                            <Link to={`/profile/update/email`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon/>}/>
                            </Link>
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.state.phone}
                        </Typography>

                    </Grid>
                    <Grid item xs={4}>
                        <Box mx="auto">
                            <Box mt={3}>
                                <Link to={`/profile/update/password`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon/>}>
                                        Change password</Button>
                                </Link>
                            </Box>
                            <Box mt={5}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon/>}
                                    style={useStyles.button}
                                    onClick={this.delete}
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
        );
    }
}

export default ProfileForm;