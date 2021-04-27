import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Typography,
  GridList,
  GridListTile,
  IconButton,
  Divider,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Image } from 'components/atoms';

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  socialIcon: {
    borderRadius: 0,
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    background: theme.palette.alternate.main,
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const Content = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();
  const items = [];

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <br></br>
      <Typography component='p' variant='h4' color='textPrimary'>
        Ingredients
      </Typography>
      <br></br>
      <div className={classes.section}>
        <Typography component='p' variant='h6' color='textPrimary'>
          2.Nisi minim tempor cillum Lorem et ut Lorem culpa anim eu aute
          reprehenderit.
        </Typography>
        <Typography component='p' variant='h6' color='textPrimary'>
          3.Do ea consequat magna aliquip non pariatur.
        </Typography>
      </div>
      <Divider></Divider>
      <br></br>
      <Typography component='p' variant='h4' color='textPrimary'>
        Directions
      </Typography>
      <br></br>
      {/* <div className={classes.section}>
        <Image
          {...data.cover}
          className={classes.image}
          lazyProps={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={classes.section}>
        <Typography component='p' variant='h4' color='primary' align='center'>
          "{data.quote}"
        </Typography>
      </div>
      <div className={classes.section}>
        <Typography component='p' variant='h6' color='textPrimary'>
          {data.text1}
        </Typography>
      </div> */}

      <div className={classes.section}>
        {data.directions.map((value, index) => {
          return (
            <Typography
              component='p'
              variant='h6'
              color='textPrimary'
              key={index}
            >
              {value.step} {value.content}
            </Typography>
          );
        })}
        {/* <Typography component='p' variant='h6' color='textPrimary'>
          1.Eu esse voluptate excepteur exercitation amet elit eu pariatur
          aliqua ex consectetur ex officia.
        </Typography>
        <Typography component='p' variant='h6' color='textPrimary'>
          2.Nulla voluptate culpa irure veniam ipsum cillum eiusmod eiusmod sit.
        </Typography>
        <Typography component='p' variant='h6' color='textPrimary'>
          3.Ex enim qui amet eu consequat do ex minim do deserunt qui consequat.
        </Typography>
        <Typography component='p' variant='h6' color='textPrimary'>
          4.Consectetur magna Lorem aliquip aliqua.
        </Typography>
        <Typography component='p' variant='h6' color='textPrimary'>
          5.Proident proident enim voluptate nostrud veniam.
        </Typography> */}
      </div>
      <div>
        <IconButton className={classes.socialIcon}>
          <FacebookIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <InstagramIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <TwitterIcon />
        </IconButton>
        <IconButton className={classes.socialIcon}>
          <PinterestIcon />
        </IconButton>
      </div>
    </div>
  );
};

Content.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.object.isRequired,
};

export default Content;
