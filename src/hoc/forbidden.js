import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import { createBrowserHistory } from "history";
import { Box } from '@material-ui/core';

const alertStyles = {
    textAlign: 'center'
}

let history = createBrowserHistory();

class Forbidden extends Component {
    timer = () => {
        setTimeout(() => {
            history.goBack();
        }, 4000);
    }

    componentDidMount() {
        this.timer();
    }
    render() {

        return (
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={4}>
                    <Box mx="auto">
                        <Box mt={3}>
                            <Alert severity="error" style={alertStyles}>
                                <AlertTitle>Access Denied</AlertTitle>
                                You tried to open page which you are not permitted
                            </Alert>
                        </Box>
                    </Box>
                </Grid><Grid item xs>
                </Grid>
            </Grid>
        );

    }
}

export default Forbidden;