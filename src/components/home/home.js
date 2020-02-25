import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Box } from '@material-ui/core';
import axios from '../../utils/axios';
import Auth from '../../hoc/auth';



class HomePage extends Component {

    state = {
        userrole: undefined
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role)
            this.setState({ 'userrole': response.data.role });
            console.log(response.data);

        }, error => {
            console.log(error.response.data.message);
        })
    }

    componentDidMount = () => {
        this.getRole();

    }



    render() {

        let userLinks = null;
        let myProfile = null;
        if (this.state.userrole === 'ROLE_ADMIN') {
            userLinks = (
                <Box mx="auto">
                    <Box mt={5}>
                        <Link to="/admin">
                            <Button
                                variant="contained"
                                color="primary"
                            >Admin Page</Button>
                        </Link>
                    </Box>
                </Box>
            );

            myProfile = (
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
            );
        } else if (this.state.userrole === 'ROLE_MANAGER') {
            userLinks = (
                <Box mx="auto">
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
                </Box>
            );
            myProfile = (
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
            );
        } else if (this.state.userrole === 'ROLE_REGISTER') {
            userLinks = (
                <Box mx="auto">
                    <Box mt={5}>
                        <Link to="/resource">
                            <Button
                                variant="contained"
                                color="primary"
                            >Resources</Button>
                        </Link>
                    </Box>
                </Box>
            );
            myProfile = (
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
            );
        } else if (this.state.userrole === 'ROLE_USER') {
            userLinks = (
                <Box mx="auto">
                    <Box mt={5}>
                        <Link to="/resource">
                            <Button
                                variant="contained"
                                color="primary"
                            >Resources</Button>
                        </Link>
                    </Box>
                </Box>
            );
            myProfile = (
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
            );
        } else if (this.state.userrole === 'ROLE_GUEST') {
            userLinks = (
                <Box mx="auto">
                    <Box mt={5}>
                        <h2>Please wait your data in processing</h2>
                    </Box>
                </Box>
            );
        }

        return (
            <div>
                <Auth>
                    <Grid item xs={12}>
                        <h1>Resource Managment System</h1>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs></Grid>
                        <Grid item xs>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                {userLinks}
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                {myProfile}
                            </Grid>
                        </Grid>
                    </Grid>
                </Auth>
            </div >
        );
    }
}

export default HomePage;