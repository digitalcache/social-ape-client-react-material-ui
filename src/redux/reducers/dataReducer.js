import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_SCREAMS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };
      case SET_SCREAM:
        return {
          ...state,
          scream: action.payload
        };
      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        let comments = state.scream.comments;
        let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
        state.screams[index] = action.payload;
        if (state.scream.screamId === action.payload.screamId) {
          state.scream = action.payload;
        }
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: comments
          } 
        };
      case DELETE_SCREAM:
        let indexDelete = state.screams.findIndex(
          (scream) => scream.screamId === action.payload
        );
        state.screams.splice(indexDelete, 1);
        return {
          ...state
        };
      case POST_SCREAM:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        if (state.scream.screamId === action.payload.screamId) {
          state.scream.commentCount = state.scream.comments.length+1;
        }

        let indexOfComment = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
        state.screams[indexOfComment].commentCount = state.scream.commentCount;
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments],
            commentCount: state.scream.comments.length+1,
          }
        };
      default:
        return state;
    }
  }