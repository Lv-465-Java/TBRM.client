import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Box } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";

class HomePage extends Component {

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <h1>Resource Management System</h1>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs>
                    <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Box mx="auto">
                                <Box mt={5}>
                                    <Link to="/admin">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >Admin Page</Button>
                                    </Link>
                                </Box>
                                <Box mt={5}>
                                    <Link to="/resource-template">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >Resource Templates</Button>
                                    </Link>
                                </Box>
                                <Box mt={5}>
                                    <Link to="/resource">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >Resources</Button>
                                    </Link>
                                </Box>
                                <Box mt={5}>
                                    <Link to="/group">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >Groups</Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Box mx="auto">
                                <Box mt={5}>
                                    <Link to="/profile">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >My Profile</Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        );
    }
}

export default HomePage;