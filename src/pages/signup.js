import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from '../images/bat.png';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.common,
})

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }
    render() {
        const { classes, UI : { loading } } = this.props;
        const { errors } = this.state; 
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="bat image" className={classes.image}></img>
                    <Typography variant="h4" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            fullWidth
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField} 
                            value={this.state.email}
                            onChange={this.handleChange}
                            ></TextField>
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            fullWidth
                            className={classes.textField} 
                            value={this.state.password}
                            onChange={this.handleChange}
                            ></TextField>
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            fullWidth
                            className={classes.textField} 
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            ></TextField>
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            fullWidth
                            className={classes.textField} 
                            value={this.state.handle}
                            onChange={this.handleChange}
                            ></TextField>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={loading}
                            className={classes.button}>
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}></CircularProgress>
                            )}
                        </Button>
                        <br></br>
                        <small>Already have an account ? login <Link to="/login">here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));