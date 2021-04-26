import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from '@material-ui/core';
import validate from 'validate.js';
import { gql, useMutation } from '@apollo/client';
import {
  userSelector,
  setUserProfile,
} from '../../../../features/user/UserSlice';
import { useSelector, useDispatch } from 'react-redux';

const schema = {
  oldPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
  newPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
  oldPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
};

const UPDATE_PASSWORD = gql`
  mutation changeUserPassword(
    $userID: ID
    $oldPassword: String
    $newPassword: String
  ) {
    changePassword(
      _id: $userID
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      _id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  switchTitle: {
    fontWeight: 700,
  },
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Security = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { _id } = useSelector(userSelector);
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [changeUserPassword, updatePasswordResult] = useMutation(
    UPDATE_PASSWORD
  );

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

  React.useEffect(() => {
    console.log(updatePasswordResult.data);
    // alert('Change password Success');
  }, [updatePasswordResult.data]);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.isValid) {
      const oldPassword = formState.values.oldPassword;
      const newPassword = formState.values.newPassword;
      const userID = _id;

      changeUserPassword({
        variables: {
          userID,
          oldPassword,
          newPassword,
        },
      })
        .then(() => {
          alert('Update password complete');
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          window.location.reload();
        });

      setFormState({ isValid: false, values: {}, touched: {}, errors: {} });
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };
  React.useEffect(() => {
    let errors = validate(formState.values, schema);
    if (formState.values.repeatPassword !== formState.values.newPassword) {
      errors = { ...errors, repeatPassword: ['Password does not match'] };
    }
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <form name='password-reset-form' method='post' onSubmit={handleSubmit}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <div className={classes.titleCta}>
              <Typography variant='h6' color='textPrimary'>
                Change Password
              </Typography>
              <Button variant='outlined' color='primary'>
                Log out
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Current password
            </Typography>
            <TextField
              placeholder='Old password'
              variant='outlined'
              size='medium'
              name='oldPassword'
              fullWidth
              type='password'
              onChange={handleChange}
              helperText={
                hasError('oldPassword') ? formState.errors.oldPassword[0] : null
              }
              error={hasError('oldPassword')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              New password
            </Typography>
            <TextField
              placeholder='New password'
              variant='outlined'
              size='medium'
              name='newPassword'
              fullWidth
              type='password'
              onChange={handleChange}
              helperText={
                hasError('newPassword') ? formState.errors.newPassword[0] : null
              }
              error={hasError('newPassword')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Repeat password
            </Typography>
            <TextField
              placeholder='Repeat password'
              variant='outlined'
              size='medium'
              name='repeatPassword'
              fullWidth
              type='password'
              onChange={handleChange}
              helperText={
                hasError('repeatPassword')
                  ? formState.errors.repeatPassword[0]
                  : null
              }
              error={hasError('repeatPassword')}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item container justify='flex-start' xs={12}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='large'
            >
              save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Security.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Security;
