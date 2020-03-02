import React, {Component} from "react";
import axios from "../../utils/axios";
import Axios from 'axios';
import {Box, Paper,FormControl, FormHelperText, Grid, TextField} from "@material-ui/core";
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
import Container from "@material-ui/core/Container";

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
    height: 700
    // backgroundColor: '#e0ebeb'

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
        openDialogChangePassword: false,
        openDialogChangeEmail: false,
        openDialogChangeData: false,
        openDialogDelete: false,
        openDialogDeletePicture: false,
        errorMessage: '',
        errorMessages: {}
    }
    validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(_)/><?"|+=:]{8,}$/;
        return re.test(password);
    }
    validateEmail = (email) => {
        let re = /^\s*[a-zA-Z0-9]+(([._\-])?[a-zA-Z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}\s*$/;
        return re.test((email).toLowerCase());
    };
    validatePhone = (phone) => {
        let re = /^\s*\+[0-9]{12}\s*$/;
        return re.test(phone);
    };
    validateFirstName = (firstName) => {
        let re = /^\s*(([A-Za-z]){2,})+(((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(firstName);
    };

    validateLastName = (lastName) => {
        let re = /^\s*([A-Za-z]+((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(lastName);
    };

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
    onChangeOldPassword = (event) => {
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
    onChangePhone = (event) => {
        let phone = event.target.value;
        this.setState({phone});
        if (!this.validatePhone(phone)) {
            let errors = {...this.state.errorMessages, ["phone"]: "Phone number is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["phone"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangeFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({firstName});
        if (!this.validateFirstName(firstName)) {
            let errors = {...this.state.errorMessages, ["firstName"]: "First name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["firstName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    };
    onChangeLastName = (event) => {
        let lastName = event.target.value;
        this.setState({lastName});
        if (!this.validateLastName(lastName)) {
            let errors = {...this.state.errorMessages, ["lastName"]: "Last name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["lastName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangeEmail = (event) => {
        let email = event.target.value;
        this.setState({email});

        if (!this.validateEmail(email)) {
            let errors = {...this.state.errorMessages, ["email"]: "Email is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["email"]: undefined};
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
        if (this.state.photo.includes("null")) {
            this.setState({
                selectedFile: event.target.files[0]
            }, () => this.UploadPhoto());
        } else {
            this.setState({
                selectedFile: event.target.files[0]
            }, () => this.UpdatePhoto());
        }


        // this.props.history.push("/profile")

    };
    UploadPhoto = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post("/profile/upload_photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            this.getData();
        });
        // this.props.history.push("/profile")

    };
    UpdatePhoto = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.put("/profile/updatePhoto", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            this.getData();
        });
        // this.props.history.push("/profile")

    };

    handleClickDeletePhoto = () => {
        axios.delete("/profile/deletePhoto").then(r => {
                this.getData();
            },
            error => {
                this.setState({
                    errorMessage: error.response.data.message,
                });
                console.log(error.response.data.message);
            });
        this.setState({openDialogDeletePicture: false})
    };

    handleOpenDialogChangePassword = () => {
        this.setState({openDialogChangePassword: true});
    };
    handleCloseDialogChangePassword = () => {
        this.setState({openDialogChangePassword: false});
    };

    handleOpenDialogChangeEmail = () => {
        this.setState({openDialogChangeEmail: true});
    };
    handleCloseDialogChangeEmail = () => {
        this.setState({openDialogChangeEmail: false});
    };

    handleOpenDialogChangeData = () => {
        this.setState({openDialogChangeData: true});
    };
    handleCloseDialogChangeData = () => {
        this.setState({openDialogChangeData: false});
        this.getData()
    };

    handleOpenDialogDeletePicture = () => {
        this.setState({openDialogDeletePicture: true});
    };
    handleCloseDialogDeletePicture = () => {
        this.setState({openDialogDeletePicture: false});
    };
    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };
    delete = () => {
        axios.delete(`/delete`).then(
            response => {
            }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message,
                openDialogDelete: false
            });
            console.log(error.response.data.message);
        })
        this.setState({
            openDialogDelete: false
        });

    }

    componentDidMount() {
        this.getData();
        // this.handleClickAddPhoto();
    }

    editPassword = () => {
        axios.patch(`/profile/update/password`, {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            }
        ).then(
            response => {
                this.setState({openDialogChangePassword: false})
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(error.response.data.message);
        });
    };
    editData = () => {
        axios.put(`/profile/update`, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone
            }
        ).then(
            response => {
                this.setState({openDialogChangeData: false})
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(error.response.data.message);
        });
    };
    editEmail = () => {
        axios.put(`/profile/update/email`, {
                password: this.state.password,
                email: this.state.email
            }
        ).then(
            response => {
                this.props.history.push("/profile/massage")
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(error.response.data.message);
        });
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={1}/>
                <Card style={style}>
                    <CardActionArea>
                        <CardContent>

                            <Grid container={"true"} justify={"space-evenly"}>
                                <Grid item xs={6}>
                                    <Avatar src={this.state.photo}
                                            style={photoLarge}
                                            // variant='rounded'
                                    />
                                    {/*<Grid*/}
                                    {/*    // container={"true"}*/}
                                    {/*>*/}
                                        <IconButton
                                            color="primary"
                                            style={{
                                                position: "absolute",
                                                right: 610
                                            }}
                                            component="label"
                                        >
                                            <AddAPhotoIcon/>
                                            <Input type='file' disableUnderline='true' fullWidth='true'
                                                   style={{display: "none"}}
                                                   onChange={this.handleClickAddPhoto}
                                                   placeholder='Change profile picture'/>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            style={{position: "absolute",
                                                right: 570
                                            }}
                                            onClick={this.handleOpenDialogDeletePicture}>
                                            <DeleteIcon/></IconButton>
                                        <MyDialog
                                            delete={this.handleClickDeletePhoto}
                                            open={this.state.openDialogDeletePicture}
                                            handleClose={this.handleCloseDialogDeletePicture}
                                            title="Delete profile picture"
                                            msg="Are you sure you want to delete your profile picture?"/>
                                        {/*</div>*/}
                                    {/*</Grid>*/}
                                </Grid>
                                <Grid item xs={6}>
                                    {/*<Grid container={"true"}>*/}
                                    <Typography variant="h3" component="h3" color="textPrimary">
                                        {this.state.firstName} {this.state.lastName}
                                    </Typography>
                                    <Typography variant="h5" align="left" color="textSecondary" component="p">
                                        {this.state.phone}
                                    </Typography>
                                    <Button
                                        align="left"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        // style={{
                                        // marginTop: 90
                                        // ,width: 200}}
                                        onClick={this.handleOpenDialogChangeData}
                                        startIcon={<EditIcon/>}>
                                        Change user data</Button>
                                    <Dialog
                                        open={this.state.openDialogChangeData}
                                        onClose={this.handleCloseDialogChangeData}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle id="responsive-dialog-title">Change profile data</DialogTitle>
                                        <DialogContent>
                                            <TextField type="firstName" style={textFieldStyles} label="First name"
                                                       onChange={this.onChangeFirstName}
                                                       helperText={this.state.errorMessages["firstName"]}
                                                       error={this.state.errorMessages["firstName"] !== undefined}
                                            />
                                            <TextField type="lastName" label="Last name" style={textFieldStyles}
                                                       onChange={this.onChangeLastName}
                                                       helperText={this.state.errorMessages["lastName"]}
                                                       error={this.state.errorMessages["lastName"] !== undefined}
                                            />
                                            <TextField type="phone" label="Phone" style={textFieldStyles}
                                                       onChange={this.onChangePhone}
                                                       helperText={this.state.errorMessages["phone"]}
                                                       error={this.state.errorMessages["phone"] !== undefined}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleCloseDialogChangeData}
                                                    color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.editData} color="primary">
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Typography variant="h5" align="left" color="textSecondary" component="p">
                                        {this.state.email}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleOpenDialogChangeEmail}
                                            startIcon={<EditIcon/>}/>
                                        <Dialog
                                            open={this.state.openDialogChangeEmail}
                                            onClose={this.handleCloseDialogChangeEmail}
                                            aria-labelledby="responsive-dialog-title"
                                        >
                                            <DialogTitle id="responsive-dialog-title">Change email</DialogTitle>
                                            <DialogContentText>
                                                Please enter your password
                                            </DialogContentText>
                                            <DialogContent>
                                                <FormControl>
                                                    <InputLabel htmlFor="Password">Password</InputLabel>
                                                    <Input id="Password"
                                                           type={this.state.showPassword ? 'text' : 'password'}
                                                           placeholder="Password"
                                                           style={textFieldStyles}
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
                                                    {this.state.errorMessages["password"] !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="Password"
                                                                    error={true}>
                                                        {this.state.errorMessages["password"]}
                                                    </FormHelperText>}
                                                </FormControl>
                                                <TextField type="email" label="Email" style={textFieldStyles}
                                                           onChange={this.onChangeEmail}
                                                           helperText={this.state.errorMessages["email"]}
                                                           error={this.state.errorMessages["email"] !== undefined}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseDialogChangeEmail}
                                                        color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.editEmail} color="primary">
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Typography>
                                    {/*</div>*/}
                                    <Grid xl={6}/>
                                    <Grid xs={12} direction={"row-reverse"} alignContent={"flex-end"}>
                                        <Button
                                            align="left"
                                            variant="contained"
                                            color="primary"
                                            size="small" style={{
                                            marginTop: 90
                                            , width: 200
                                        }}
                                            onClick={this.handleOpenDialogChangePassword}
                                            startIcon={<EditIcon/>}>
                                            Change password</Button>
                                        <Dialog
                                            open={this.state.openDialogChangePassword}
                                            onClose={this.handleCloseDialogChangePassword}
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
                                                           error={!!this.state.errorMessage}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowOldPassword}>
                                                                       {this.state.showOldPassword ? <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {!!this.state.errorMessage &&
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
                                                <FormControl>
                                                    <InputLabel htmlFor="Repeat Password">Repeat Password</InputLabel>
                                                    <Input type={this.state.showConfPassword ? 'text' : 'password'}
                                                           placeholder="Repeat Password"
                                                           id={"Repeat Password"}
                                                           style={textFieldStyles}
                                                           onChange={this.onChangeConfirmationPassword}
                                                           helperText={this.state.errorMessages["confirmationPassword"]}
                                                           error={this.state.errorMessages["confirmationPassword"] !== undefined}
                                                           endAdornment={
                                                               <InputAdornment position="end">
                                                                   <IconButton
                                                                       onClick={this.handleClickShowConfPassword}>
                                                                       {this.state.showConfPassword ? <Visibility/> :
                                                                           <VisibilityOff/>}
                                                                   </IconButton>
                                                               </InputAdornment>
                                                           }
                                                    />
                                                    {this.state.errorMessages["confirmationPassword"] !== undefined &&
                                                    <FormHelperText style={textFieldStyles}
                                                                    htmlFor="Repeat Password"
                                                                    error={true}>
                                                        {this.state.errorMessages["confirmationPassword"]}
                                                    </FormHelperText>}
                                                </FormControl>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleCloseDialogChangePassword}
                                                        color="primary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.editPassword} color="primary">
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small" style={{
                                            marginTop: 90,
                                            width: 200
                                        }}
                                            startIcon={<DeleteIcon/>}
                                            // style={useStyles.button}
                                            onClick={this.handleOpenDialogDelete}
                                        >
                                            Delete Account</Button>
                                        <MyDialog
                                            delete={this.delete}
                                            open={this.state.openDialogDelete}
                                            handleClose={this.handleCloseDialogDelete}
                                            title="Delete account"
                                            msg="Are you sure you want to delete your account?"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*</div>*/}
                            {/*</Grid>*/}
                            {/*</Grid>*/}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}

export default ProfileForm;