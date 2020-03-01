import React, {Component} from "react";
import axios from "../../utils/axios";
import {Box, FormControl, FormHelperText, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import EmailIcon from "@material-ui/icons/Email";
import MyDialog from "../resourceTemplate/popUp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const gridStyles = {
    marginTop: 30
};

const textFieldStyles = {
    width: 300,
    minWidth: 100,
    maxWidth: 300
};
const style = {
    maxWidth: 1000,
    minWidth: 1000,
    marginTop: 50,
    backgroundColor: '#e0ebeb'

};
const divStyle = {
    display: 'inline-block'
}

const photoLarge = {
    maxWidth: 400,
    minWidth: 400,
    height: 350,
    display: 'flex',
    // sizes: '200'
};
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

class ProfileForm extends Component {
    state = {
        // classes: useStyles(),
        photo: this.props.photo,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        phone: this.props.phone,
        selectedFile: undefined,
        oldPassword: undefined,
        newPassword: undefined,
        confirmationPassword: undefined,
        showOldPassword: false,
        showPassword: false,
        showConfPassword: false,
        open: false,
        openPasswordChange: false,
        errorMessage: '',
        errorMessages: {}
    }
    validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(_)/><?"|+=:]{8,}$/;
        return re.test(password);
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };
    handleClickShowConfPassword = () => {
        this.setState({showConfPassword: !this.state.showConfPassword});
    };
    handleClickShowOldPassword = () => {
        this.setState({showOldPassword: !this.state.showOldPassword});
    };
    onChangePassword = (event) => {
        let newPassword = event.target.value;
        this.setState({newPassword});
        if (!this.validatePassword(newPassword)) {
            let errors = {
                ...this.state.errorMessages,
                ["newPassword"]: "Password must contain at least eight characters and at least one character of "
                + " uppercase letter, lowercase letter, digit, special character"
            };
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["newPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    };
    onChangeOldPassword=(event)=>{
        let oldPassword = event.target.value;
        this.setState({oldPassword});
    }

    onChangeConfirmationPassword = (event) => {
        let confirmationPassword = event.target.value;
        this.setState({confirmationPassword});
        if (confirmationPassword !== this.state.newPassword) {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: "Passwords do not match"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };


    getData = () => {
        axios.get(`/profile`).then(
            response => {
                console.log(response.data);
                let data = response.data;
                this.setState({
                    id: data.id,
                    photo: data.imageUrl,
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
    };

    handleClickAddPhoto = (event) => {
        // event.preventDefault();
        this.setState({
            selectedFile: event
        });
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post("/profile/upload_photo", this.props.formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Enctype': 'multipart/form-data',
                // 'Accept': 'application/json'
            }
        }).then(r => {
        });
        // this.props.history.push("/profile")

    };

    handleClickDeletePhoto = () => {
        axios.delete("/profile/deletePhoto").then(r => {
            this.props.history.push("/profile").catch(error => {
                this.setState({
                    errorMessage: error.response.data.message,
                });
                console.log(error.response.data.message);
            });
            this.componentDidMount()
        })
    };

    handleClickOpen = () => {
        console.log("open");
        this.setState({open : true})
    };
    handleClickOpenPassw = () => {
        console.log("open");
        this.setState({openPasswordChange : true})
    };

    handleClosePassw = () => {
        console.log("close");
        this.setState({openPasswordChange: false});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    delete = () => {
        axios.delete(`/delete`).then(
            response => {
                this.props.history.push("/");
            }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message,
                open: false
            });
            console.log(error.response.data.message);
        })

    }

    componentDidMount() {
        this.getData();
        // this.editPassword();
        // this.handleClosePassw();
    }

    editPassword = () =>{
        axios.patch(`/profile/update/password`,{
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword}
        ).then(
            response => {
                this.props.history.push("/profile") }).catch(error => {
            let errors = {};
            error.response.data.forEach(err => {
                errors[[err.name]] = err.message;
            });
            this.setState({errorMessages: errors}, () => console.log(this.state));

            console.log(error.response.data.message);
        });
        this.setState({openPasswordChange: false});
    };

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Card style={style}>
                    <CardActionArea>
                        <CardContent>

                            <Grid item xs={5}>
                                <div
                                    // style={divStyle}
                                    style={{display: "inline"}}>
                                    <Avatar src={this.state.photo}
                                        // className={photoLarge}
                                            style={photoLarge}
                                            variant='rounded'/>
                                    <Input type='file' onChange={this.handleClickAddPhoto}
                                           endAdornment={<IconButton
                                               onClick={this.handleClickAddPhoto}>
                                               <AddAPhotoIcon/>
                                           </IconButton>}/>
                                    <div>
                                        <Button variant="contained" color="primary"
                                                size="small"
                                                onClick={this.handleClickDeletePhoto}>
                                            <DeleteIcon/></Button>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.state.firstName}
                                        </Typography>
                                        <Typography variant="h5" color="textSecondary" component="p">
                                            {this.state.lastName}
                                        </Typography>
                                        {/*<form*/}
                                        {/*    // action={this.handleClickAddPhoto()}*/}
                                        {/*    method="post" encType="multipart/form-data">*/}
                                        {/*    <input type="file" name="file"/>*/}
                                        {/*    <input type="submit" onClick={this.handleClickAddPhoto}/>*/}
                                        {/*</form>*/}
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
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={4}>
                                <Box mx="auto">
                                    <Box mt={3}>
                                        <Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleClickOpenPassw}
                                            startIcon={<EditIcon/>}>
                                            Change password</Button>
                                        <Dialog
                                            open={this.handleClickOpenPassw}
                                            onClose={this.handleClosePassw}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">Change password</DialogTitle>
                                            <DialogContent>
                                                <FormControl>
                                                    <InputLabel htmlFor="Old Password">Old Password</InputLabel>
                                                    <Input type={this.state.showOldPassword ? 'text' : 'password'}
                                                           placeholder="Old Password"
                                                           fullWidth
                                                           id={"Old Password"}
                                                           style={textFieldStyles}
                                                           onChange={this.onChangeOldPassword}
                                                           helperText={this.state.errorMessage}
                                                           error={this.state.errorMessage !== undefined}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowOldPassword}>
                                                                       {this.state.showOldPassword ? <Visibility/> : <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {this.state.errorMessage !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="Old Password"
                                                                    error={true}>
                                                        {this.state.errorMessage}
                                                    </FormHelperText>}
                                                </FormControl>
                                                <FormControl>
                                                    <InputLabel htmlFor="New Password">Password</InputLabel>
                                                    <Input id="New Password"
                                                           type={this.state.showPassword ? 'text' : 'password'}
                                                           placeholder="New Password"
                                                           style={textFieldStyles}
                                                           fullWidth
                                                           onChange={this.onChangePassword}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowPassword}>
                                                                       {this.state.showPassword ? <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {this.state.errorMessages["newPassword"] !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="New Password"
                                                                    error={true}>
                                                        {this.state.errorMessages["newPassword"]}
                                                    </FormHelperText>}
                                                </FormControl>
                                                {/*<FormControl>*/}
                                                {/*    <InputLabel htmlFor="Repeat Password">Repeat Password</InputLabel>*/}
                                                {/*    <Input type={this.state.showConfPassword ? 'text' : 'password'}*/}
                                                {/*           placeholder="Repeat Password"*/}
                                                {/*           id={"Repeat Password"}*/}
                                                {/*           style={textFieldStyles}*/}
                                                {/*           onChange={this.onChangeConfirmationPassword}*/}
                                                {/*           helperText={this.state.errorMessages["confirmationPassword"]}*/}
                                                {/*           error={this.state.errorMessages["confirmationPassword"] !== undefined}*/}
                                                {/*           endAdornment={*/}
                                                {/*               <InputAdornment position="end">*/}
                                                {/*                   <IconButton*/}
                                                {/*                       onClick={this.handleClickShowConfPassword}>*/}
                                                {/*                       {this.state.showConfPassword ? <Visibility/> : <VisibilityOff/>}*/}
                                                {/*                   </IconButton>*/}
                                                {/*               </InputAdornment>*/}
                                                {/*           }*/}
                                                {/*    />*/}
                                                {/*    {this.state.errorMessages["confirmationPassword"] !== undefined &&*/}
                                                {/*    <FormHelperText style={textFieldStyles}*/}
                                                {/*                    htmlFor="Repeat Password"*/}
                                                {/*                    error={true}>*/}
                                                {/*        {this.state.errorMessages["confirmationPassword"]}*/}
                                                {/*    </FormHelperText>}*/}
                                                {/*</FormControl>*/}
                                            </DialogContent>
                                            <DialogActions>
                                                <Button  onClick={this.handleClosePassw} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button  onClick={this.editPassword} color="primary">
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        </Box>
                                    </Box>
                                    <Box mt={5}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon/>}
                                            style={useStyles.button}
                                            onClick={this.handleClickOpen}
                                        >
                                            Delete Account</Button>
                                        <MyDialog
                                            delete={this.delete}
                                            open={this.state.open}
                                            handleClickOpen={this.handleClickOpen}
                                            handleClose={this.handleClose}
                                            title="Delete account"
                                            msg="Are you sure you want to delete your account?"/>
                                    </Box>
                                </Box>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}

export default ProfileForm;