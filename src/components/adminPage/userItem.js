import axios from "../../utils/axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import DeleteIcon from '@material-ui/icons/Delete';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Container} from "@material-ui/core";
import MaterialTable from "material-table";
import {Image} from "@material-ui/icons";


const cardStyle = {
    maxWidth: 300,
    minWidth: 250,
    margin: 10,

}

class UserItem extends Component {
    state = {
        id: this.props.item.id,
        revtype: this.props.item.revtype,
        reset_token: this.props.item.reset_token,
        to_timestamp: this.props.item.to_timestamp,
        firstName: this.props.item.first_name,
        lastName: this.props.item.last_name,
        email: this.props.item.email,
        phone: this.props.item.phone,
        password: this.props.item.password,
        enabled: this.props.item.enabled,
        imageUrl: this.props.item.image_url,
        role: this.props.item.role,
        userHistory: [],
        open: false
    }

    handleClickOpen = () => {
        this.setState({open: true});
        this.getHistoryData();
    }

    handleClose = () => {
        this.setState({open: false});
    }
    getHistoryData = () => {
        axios.get(`/user/${this.state.id}`).then(response => {
            this.setState({userHistory: response.data});
            console.log(this.state.userHistory)
        })
    }

    render() {
        return (

            <TableRow>

                <TableCell align="right">  {this.state.to_timestamp.replace("T", " ").substring(0, 19)}</TableCell>
                <TableCell align="right">
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <div onClick={this.handleClickOpen}>
                        <Avatar src={this.state.imageUrl}/>
                    </div>
                </TableCell>
                <Dialog
                    fullWidth={'true'}
                    maxWidth={'xl'}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title">
                    <DialogTitle id="max-width-dialog-title">User history </DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}
                                        style={{weight: 600}}>
                            <Table>
                                {this.state.userHistory.map((item) =>
                                    (<UserItem key={item}
                                               item={item}/>)
                                )}
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <TableCell align="right">  {this.state.revtype}</TableCell>
                <TableCell align="right">  {this.state.reset_token}</TableCell>
                <TableCell align="right"> {this.state.firstName}</TableCell>
                <TableCell align="right">{this.state.lastName}</TableCell>
                <TableCell align="right">{this.state.email}</TableCell>
                <TableCell align="right">{this.state.phone}</TableCell>

            </TableRow>
        )
    }


    redirect = () => {
        this.props.history.pushState(`/profile`);
    }
}

export default UserItem;