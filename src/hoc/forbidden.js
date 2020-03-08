import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import { createBrowserHistory } from 'history';
import { Box, Button } from '@material-ui/core';

const alertStyles = {
    textAlign: 'center'
}

const buttonStyles = {
    marginTop:  20,
    minWidth: 150
}

let history = createBrowserHistory();

class Forbidden extends Component {

    goBack = () => {
        history.goBack();
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
                        <Button
                        variant="contained"
                        color="default"
                        style={buttonStyles}
                        onClick={this.goBack}>Go Back</Button>
                    </Box>
                </Grid><Grid item xs>
                </Grid>
            </Grid>
        );

    }
}

export default Forbidden;