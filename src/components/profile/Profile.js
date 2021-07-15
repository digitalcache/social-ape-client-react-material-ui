import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI Stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux Stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton'; 
import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = (theme) => ({
    ...theme.common,
})

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, user: { credentials: { handle, createdAt, imageURL, bio, website, location }, loading, authenticated}} = this.props; 
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageURL} alt="profile" className="profile-image"></img>
                        <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange}></input>
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        { location && (
                            <>
                                <LocationOn color="primary"></LocationOn>
                                <span>{location}</span>
                                <hr />
                            </>
                        )}
                        { website && (
                            <>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                                <hr />
                            </>
                        )}
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout} >
                        <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">No profile found, please login again</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton/>)
        
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));