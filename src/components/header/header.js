import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout, isUserLoggedIn } from '../../service/authService';
import {BrowserRouter, Link} from 'react-router-dom';


const Header = (props) => {

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

     const logoutUser = () => {
        logout();
        window.location.href = "/";
      }

    const userLoggedIn = (
        <Grid>
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </Menu>
            </div>
        </Grid>
    );

    const userNotLoggedIn = (
        <BrowserRouter>
            <Grid>
                <Link to="/"><Button style={{ color: '#FFF' }}>Sign In</Button></Link>
                <Link to="/"><Button style={{ color: '#FFF' }}>Sign Up</Button></Link>
            </Grid>
        </BrowserRouter>
    );

    let headerLinks;

    if (isUserLoggedIn()) {
        headerLinks = userLoggedIn;
    } else {
        headerLinks = userNotLoggedIn;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: '#64b5f6' }}>
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container>
                        <Grid>
                            <Link to="/home"><Button style={{ color: '#FFF' }}>TBRM</Button></Link>
                        </Grid>
                        {headerLinks}
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;