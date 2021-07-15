import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';
import { getScream, clearErrors, getUserData } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
    ...theme.common,
    profileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20,
        overflowX: 'hidden'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if(oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null,null,newPath);
        this.setState({
            open: true,
            oldPath,
            newPath
        });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({
            open: false
        });

        this.props.clearErrors();
        if(this.state.oldPath === '/'){

        } else {
            this.props.getUserData(this.props.scream.userHandle);
        }
        window.history.pushState(null,null,this.state.oldPath);

    }
    componentDidMount() {
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI : { loading } } = this.props;
        // console.log(this.props)
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv} >
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}></hr>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
                    <hr className={classes.invisibleSeparator}></hr>
                    <Typography variant="body1" >{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.invisibleSeparator}></hr>
                <CommentForm userHandle={userHandle} screamId={screamId} />
                {comments && <Comments comments={comments}/>}
            </Grid>
        );
        return(
            <>
                <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors,
    getUserData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));