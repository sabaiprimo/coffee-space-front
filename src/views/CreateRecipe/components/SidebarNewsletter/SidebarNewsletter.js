import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  NativeSelect,
} from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';

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

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.cover}>
        <Image src='https://assets.maccarianagency.com/the-front/illustrations/want-to-work.svg' />
      </div>
      <SectionHeader
        title='General information'
        // subtitle='Subscribe to our Newsletter for new blog posts, tips & new photos'
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
      <div className={classes.form}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Preparation Time
            </Typography>
            <TextField
              placeholder='Preparation Time(mins)'
              variant='outlined'
              size='medium'
              name='fullname'
              fullWidth
              type='text'
            />
          </Grid>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Total Time
            </Typography>
            <TextField
              placeholder='Total Time(mins)'
              variant='outlined'
              size='medium'
              name='fullname'
              fullWidth
              type='text'
            />
          </Grid>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Serving
            </Typography>
            <TextField
              placeholder='No. of Serving'
              variant='outlined'
              size='medium'
              name='email'
              fullWidth
              type='email'
            />
          </Grid>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Level
            </Typography>
            <NativeSelect
              id='select'
              variant='outlined'
              size='medium'
              name='email'
              fullWidth
            >
              <option value='' disabled>
                Select Level
              </option>
              <option value={10}>Beginner</option>
              <option value={20}>Advance</option>
              <option value={30}>Expert</option>
            </NativeSelect>
          </Grid>

          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Roast level
            </Typography>
            <NativeSelect
              id='select'
              variant='outlined'
              size='medium'
              name='email'
              fullWidth
            >
              <option value='' disabled>
                Select Roast level
              </option>
              <option value={10}>Light roast</option>
              <option value={20}>Medium roast</option>
              <option value={30}>Dark roast</option>
            </NativeSelect>
          </Grid>

          {/* <Grid item container justify='center' xs={12}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='large'
            >
              Subscribe
            </Button>
          </Grid> */}
          {/* <Grid item container justify='center' xs={12}>
            <Typography variant='caption' color='textSecondary'>
              Subscribe to our Newsletter for new blog posts, tips & new photos.
            </Typography>
          </Grid> */}
        </Grid>
      </div>
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
