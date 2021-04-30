import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { userSelector } from '../../../../features/user/UserSlice';
import { useSelector } from 'react-redux';

import moment from 'moment';
const REPLY_COMMENT = gql`
  mutation replyComment($recipeID: ID, $userID: ID, $context: String) {
    addComment(recipeID: $recipeID, userID: $userID, context: $context) {
      _id
    }
  }
`;

// import './styles.css';

const useStyles = makeStyles(() => ({
  textWhite: {
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControl: {
    maxWidth: 400,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInputAdornment-root i': {
      color: 'white !important',
    },
  },
  image: {
    maxWidth: 400,
  },
  commnetForm: {
    width: '100%',
    display: 'block',
    marginBottom: '1rem',
  },
}));

const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

const CommentSection = (props) => {
  const classes = useStyles();
  const [commentForm, setCommentForm] = useState();
  const userID = useSelector(userSelector)._id;
  const recipeID = props.recipeid;
  const { comments } = props;
  const commentsLength = comments.length;

  const [replyComment, resultCommentMutation] = useMutation(REPLY_COMMENT);

  const handleChange = (event) => {
    event.persist();
    setCommentForm(event.target.value);
  };

  React.useEffect(() => {
    if (resultCommentMutation.data) {
      window.location.reload();
    }
  }, [resultCommentMutation.data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentForm) {
      replyComment({
        variables: {
          recipeID,
          userID,
          context: commentForm,
        },
      });
    }
  };
  return (
    <div style={{ padding: 14 }} className='App'>
      <h1>Comments</h1>
      <Paper style={{ padding: '40px 20px' }}>
        {comments.map((value, idx) => {
          return (
            <div key={idx}>
              <Grid container wrap='nowrap' spacing={2}>
                <Grid item>
                  <Avatar
                    alt={value.userID.displayName}
                    src={value.userID.pictureProfile}
                  />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: 'left' }}>
                    {value.userID.displayName}
                  </h4>
                  <p style={{ textAlign: 'left' }}>{value.context} </p>
                  <p style={{ textAlign: 'left', color: 'gray' }}>
                    posted {moment(value.commentDate).fromNow()}
                  </p>
                </Grid>
              </Grid>
              {idx < commentsLength - 1 ? (
                <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
              ) : (
                ''
              )}
            </div>
          );
        })}
      </Paper>
      <br></br>
      <Divider></Divider>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className={classes.commnetForm}>
          <TextField
            id='outlined-multiline-static'
            label='Add commnet'
            fullWidth
            multiline
            rows={4}
            onChange={handleChange}
            //   defaultValue='Default Value'
            //   variant='outlined'
          />
        </div>

        <Button variant='contained' color='primary' type='submit'>
          Reply
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
