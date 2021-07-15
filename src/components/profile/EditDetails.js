import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../../util/MyButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// import classes from '*.module.css';


const styles = (theme) => ({
    ...theme.common,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio : '',
        website: '',
        location: '',
        open: false
    };
    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);

    }
    handleClose = () => {
        this.setState({open: false});
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                            name="bio"
                            type="text"
                            lable="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself."
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth
                            ></TextField>
                        <TextField 
                            name="website"
                            type="text"
                            lable="Website"
                            placeholder="Your Demo Website"
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth
                            ></TextField>
                        <TextField 
                            name="location"
                            type="text"
                            lable="Location"
                            placeholder="Where you live?"
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                            ></TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Save</Button>

                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});
  
export default connect( mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails));
