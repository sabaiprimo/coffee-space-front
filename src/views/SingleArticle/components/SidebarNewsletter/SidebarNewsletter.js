import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { gql, useMutation } from '@apollo/client';
const EMAIL_SUBSCRIPTION = gql`
  mutation subscribeEmail($email: String) {
    addSubscribe(email: $email)
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    borderRadius: theme.spacing(2),
    background: theme.palette.alternate.dark,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  cover: {
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  form: {
    '& .MuiTextField-root': {
      background: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      background: theme.palette.background.paper,
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const Form = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [emailForm, setEmailForm] = useState();
  const [subscribeEmail, subscribeResult] = useMutation(EMAIL_SUBSCRIPTION);
  const handleEmail = (e) => {
    e.persist();
    setEmailForm(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribeEmail({ variables: { email: emailForm } });
  };
  useEffect(() => {
    if (subscribeResult.data) {
      alert(subscribeResult.data.addSubscribe);
    }
  }, [subscribeResult.data]);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.cover}>
        <Image src='https://assets.maccarianagency.com/the-front/illustrations/want-to-work.svg' />
      </div>
      <SectionHeader
        title='Email newsletter'
        subtitle='Subscribe to our Newsletter for new blog posts, tips & new photos'
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
        }}
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos='fade-up'
        align='left'
      />
      <form onSubmit={handleSubmit}>
        <div className={classes.form}>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} data-aos='fade-up'>
              <Typography
                variant='subtitle1'
                color='textPrimary'
                className={classes.inputTitle}
              >
                E-mail
              </Typography>
              <TextField
                placeholder='Your e-mail address'
                variant='outlined'
                size='medium'
                name='email'
                fullWidth
                type='email'
                required
                onChange={handleEmail}
              />
            </Grid>
            <Grid item container justify='center' xs={12}>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                size='large'
              >
                Subscribe
              </Button>
            </Grid>
            <Grid item container justify='center' xs={12}>
              <Typography variant='caption' color='textSecondary'>
                Subscribe to our Newsletter for new blog posts, tips & new
                photos.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Form;
