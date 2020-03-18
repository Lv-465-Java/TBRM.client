import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import {Box, Button} from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";
import LocalSessionStorageService from "../../services/LocalStorageService";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import googleLogo from "../../img/google-logo.png";
import Alert from "@material-ui/lab/Alert";
import { getUserRole, verifyUser } from '../../service/authService';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import MyDialog from "../resourceTemplate/popUp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const localStorageService = LocalSessionStorageService.getService();

const style={
    marginTop:40
}
const formControl= {
        marginTop: 15,
        minWidth: 395,
    }

class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined,
        userrole: '',
        errorMessage: '',
        tenants: [],
        tenantid: undefined,
        tenantName:'',
        open: false
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role.name)
            this.setState({ 'userrole': response.data.role.name });
            verifyUser();

        }, error => {

        })
    }


    getData = () => {
        axios.post("/authentication", this.state,{
            headers: {
                tenant_id: this.state.tenantid
            }
        }).then(response => {
                if (response !== undefined) {
                    this.getRole();
                }
            }, error => {
           this.setState({ errorMessage: error.response.data.message });
        })
    }


    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangeTenant=(event)=>{
        this.setState({
            tenantid:event.target.value,
            tenantName: event.target.value
        })
    }
    // onChangeTenantName=(event)=>{
    //     this.setState({
    //         tenantName:event.target.value
    //     })
    // }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleTenantChange = name => event => {
        this.setState({
            ...this.state,
            tenantName: event.target.value
        });
    };

    handleChange = name => event => {
        this.setState({
            ...this.state,
            tenantid: event.target.value
        });
    };

    getTenant = () => {
        axios.get("/user").then(response => {
            if (response !== undefined) {
                let tenants = response.data.content;
                this.setState({
                    tenants: tenants,
                });
            }
        }, error => {
            this.setState({ errorMessage: error.response.data.message });
        })
    }

    componentDidMount() {
        this.getTenant();
    }


    render() {
       let options = this.state.tenants.map((data) =>
       <option
    key={data.email}
    value={data.email}
       onChange={this.onChangeTenant}
             >
        {data.firstName}
        </option>
        );
        return (
            <Container component="main" maxWidth="xs" style={style}>
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <div>
                    <TextField
                        onChange={this.onChangeEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Grid>
                    <FormControl variant="outlined" style={formControl}>
                        <InputLabel ref="" htmlFor="outlined-age-native-simple">
                            Choose Tenant
                        </InputLabel>
                        <Select
                            native
                            value={this.state.tenantid}
                            onChange={this.handleChange('tenantid')}
                            labelWidth={110}
                            inputProps={{
                                name: 'tenantid',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option>Select Tenant</option>
                            {options}
                        </Select>
                    </FormControl>
                    </Grid>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Sign In
                    </Button>

                    <Box mt={3}>
                    <Grid container>
                        <Grid item xs>
                            <Link href={"/forgot_password"}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>Don't have an account?
                            <Link href={"/registration"}>
                                 Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    </Box>
                    <h2>OR</h2>
                    <Grid>
                        <h3>Log in using your account on:</h3>
                        <Button
                            variant="contained"
                            color="default"
                            endIcon={<img src={googleLogo} alt="" width={30} height={30}/>}
                            onClick={this.handleClickOpen}>
                            Log in with Google
                        </Button>

                            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title" align="center">Choose tenant</DialogTitle>
                                <DialogContent>
                                    <Box mx={1}>
                                        <Box mt={3}
                                             display="flex"
                                             flexDirection="column">
                                            {this.state.errorMessage &&
                                            <Alert severity="error">{this.state.errorMessage}</Alert>}
                                            {this.state.successMessage &&
                                            <Alert severity="success">{this.state.successMessage}</Alert>}

                                            <Container component="main" maxWidth="xs">
                                                <CssBaseline/>
                                                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                                <div>
                                                    <FormControl variant="outlined" style={formControl}>
                                                        <InputLabel ref="" htmlFor="outlined-age-native-simple">
                                                            Choose Tenant
                                                        </InputLabel>
                                                        <Select
                                                            native
                                                            value={this.state.tenantName}
                                                            onChange={this.handleTenantChange('tenantName')}
                                                            labelWidth={110}
                                                            inputProps={{
                                                                name: 'tenantName',
                                                                id: 'outlined-age-native-simple',
                                                            }}
                                                        >
                                                            <option>Select Tenant</option>
                                                            {options}
                                                        </Select>
                                                    </FormControl>

                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                    ><Link href={GOOGLE_AUTH_URL+`?tenantid=${this.state.tenantid}`}>Next</Link>
                                                    </Button>
                                                </div>
                                            </Container>

                                        </Box>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                    </Grid>
                </div>
            </Container>
        );
    }
}


export default LoginForm;