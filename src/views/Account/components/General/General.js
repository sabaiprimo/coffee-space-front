import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import AvatarUpload from '../AvatarUpload/AvatarUpload.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  userSelector,
  setUserProfile,
} from '../../../../features/user/UserSlice';
import { gql, useMutation } from '@apollo/client';
import validate from 'validate.js';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
    },
  },
  displayName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20,
    },
  },
};

const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(
    $userID: ID
    $updateDisplayName: String
    $updateFirstName: String
    $updateLastName: String
    $updatePictureProfile: String
  ) {
    modifyUser(
      _id: $userID
      displayName: $updateDisplayName
      firstName: $updateFirstName
      lastName: $updateLastName
      pictureProfile: $updatePictureProfile
    ) {
      firstName
      lastName
      displayName
      pictureProfile
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const General = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const {
    _id,
    firstName,
    lastName,
    displayName,
    pictureProfile,
    tempUploadProfile,
  } = useSelector(userSelector);

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      pictureProfile: pictureProfile,
    },
    touched: {},
    errors: {},
  });

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const [updateUserProfile, result] = useMutation(UPDATE_USER_PROFILE);

  React.useEffect(() => {
    if (result.data) {
      alert('Update Complete');
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
      const userID = _id;
      const updateDisplayName = formState.values.displayName;
      const updateFirstName = formState.values.firstName;
      const updateLastName = formState.values.lastName;
      const updatePictureProfile = tempUploadProfile
        ? tempUploadProfile
        : pictureProfile;
      console.log(userID);
      console.log(updatePictureProfile);
      updateUserProfile({
        variables: {
          userID,
          updateDisplayName,
          updateFirstName,
          updateLastName,
          updatePictureProfile,
        },
      });
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <form name='password-reset-form' method='post' onSubmit={handleSubmit}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography variant='h6' color='textPrimary'>
              Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <AvatarUpload />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              First name
            </Typography>
            <TextField
              placeholder='Your first name'
              variant='outlined'
              size='medium'
              name='firstName'
              fullWidth
              type='text'
              onChange={handleChange}
              value={formState.values.firstName || ''}
              helperText={
                hasError('firstName') ? formState.errors.firstName[0] : null
              }
              error={hasError('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Last name
            </Typography>
            <TextField
              placeholder='Your last name'
              variant='outlined'
              size='medium'
              name='lastName'
              fullWidth
              type='text'
              onChange={handleChange}
              value={formState.values.lastName || ''}
              helperText={
                hasError('lastName') ? formState.errors.lastName[0] : null
              }
              error={hasError('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Display Name
            </Typography>
            <TextField
              placeholder='Your display name'
              variant='outlined'
              size='medium'
              name='displayName'
              fullWidth
              type='text'
              onChange={handleChange}
              value={formState.values.displayName || ''}
              helperText={
                hasError('displayName') ? formState.errors.displayName[0] : null
              }
              error={hasError('displayName')}
            />
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

General.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default General;
