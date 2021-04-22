import React from 'react';
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

const CommentSection = () => {
  const classes = useStyles();
  return (
    <div style={{ padding: 14 }} className='App'>
      <h1>Comments</h1>
      <Paper style={{ padding: '40px 20px' }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <br></br>
      <Divider></Divider>
      <br></br>
      <div className={classes.commnetForm}>
        <TextField
          id='outlined-multiline-static'
          label='Add commnet'
          fullWidth
          multiline
          rows={4}
          //   defaultValue='Default Value'
          //   variant='outlined'
        />
      </div>

      <Button variant='contained' color='primary'>
        Reply
      </Button>
      {/* <Paper style={{ padding: '40px 20px', marginTop: 100 }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: '40px 20px', marginTop: 10 }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: '40px 20px', marginTop: 10 }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: '40px 20px', marginTop: 10 }}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <Avatar alt='Remy Sharp' src={imgLink} />
          </Grid>
          <Grid justifyContent='left' item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{' '}
            </p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper> */}
    </div>
  );
};

export default CommentSection;
