import React from 'react';
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
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../features/user/UserSlice';
const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const General = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { firstName, lastName, displayName, pictureProfile } = useSelector(
    userSelector
  );
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
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
            value={firstName}
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
            value={lastName}
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
            name='address'
            fullWidth
            type='text'
            value={displayName}
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
