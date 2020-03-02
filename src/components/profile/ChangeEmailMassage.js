import React, {Component} from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";


class ChangeEmailMassage extends Component {

    render() {
        return (
            // eslint-disable-next-line react/jsx-no-undef
            <Grid xs={6}>
                <Typography variant='h6' color='primary'>You have succesfully changed your email adraces. </Typography>
                <Typography variant='subtitle1'>Please <Link to={"/"}>sign in</Link> with your new email adress</Typography>
            </Grid>

        );
    }
}

export default ChangeEmailMassage;