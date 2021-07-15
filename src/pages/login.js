import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/bat.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.common,
})

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
     
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
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
        const { classes, UI : { loading} } = this.props;
        const { errors } = this.state; 
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="bat image" className={classes.image}></img>
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
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
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={loading}
                            className={classes.button}>
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}></CircularProgress>
                            )}
                        </Button>
                        <br></br>
                        <small>dont have an account ? sign up <Link to="/signup">here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}


login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
