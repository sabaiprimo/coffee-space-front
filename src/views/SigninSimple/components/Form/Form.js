import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import validate from 'validate.js';
import { LearnMoreLink } from 'components/atoms';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import {
  loginUser,
  userSelector,
  clearState,
} from '../../../../features/user/UserSlice';
import { useLazyQuery } from '@apollo/client';
// import toast from 'react-hot-toast';
// import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      token
    }
  }
`;

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
};

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [loginUser, result] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      console.log(token);
      // setToken(token);
      localStorage.setItem('token', token);
    }
  }, [result.data]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.isValid) {
      const email = formState.values.email;
      const password = formState.values.password;

      loginUser({ variables: { email, password } });

      // window.location.replace('/');
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <form name='password-reset-form' method='post' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder='E-mail'
              label='E-mail *'
              variant='outlined'
              size='medium'
              name='email'
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type='email'
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Password'
              label='Password *'
              variant='outlined'
              size='medium'
              name='password'
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              error={hasError('password')}
              onChange={handleChange}
              type='password'
              value={formState.values.password || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant='subtitle2'>
                Fields that are marked with * sign are required.
              </Typography>
            </i>
          </Grid>
          <Grid item xs={12}>
            <Button
              size='large'
              variant='contained'
              type='submit'
              color='primary'
              fullWidth
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              align='center'
            >
              Forgot your password?{' '}
              <LearnMoreLink
                title='Reset password'
                href='/password-reset-simple'
              />
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
