import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SectionHeader } from 'components/molecules';
import { CardBase } from 'components/organisms';
import {
  useMediaQuery,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  cardBase: {
    boxShadow: 'none',
    background: theme.palette.alternate.main,
    borderRadius: theme.spacing(1),
    '& .card-base__content': {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
  },
  avatar: {
    width: 110,
    height: 110,
    objectFit: 'cover',
    border: `4px solid ${theme.palette.alternate.dark}`,
    // borderRadius: '100%',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 0,
    height: '100%',
  },
}));

const FavRecipe = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    // window.location.replace('/');
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
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} data-aos='fade-up'>
            <CardBase className={classes.cardBase} liftUp>
              <ListItem disableGutters className={classes.listItem}>
                <ListItemAvatar className={classes.listItemAvatar}>
                  {/* <Avatar className={classes.avatar} /> */}

                  <img
                    width='100px'
                    // height='100'
                    className={classes.avatar}
                    src='https://cdn.shopify.com/s/files/1/1186/7382/files/coffee-around-the-world.jpg?v=1538683476'
                  />
                </ListItemAvatar>
                {/* <ListItemIcon>
                  <StarIcon />
                </ListItemIcon> */}
                {/* <ListItemText primary='Chelsea Otakan' /> */}
                {/* <ListItemText primary='Chelsea Otakan' /> */}
                {/* <ListItemText primary='Chelsea Otakan' /> */}
                <ListItemText primary='Title' secondary='Wadawd' />
                <ListItemText primary='Subtitle' secondary='Wadawd' />

                <ListItemText primary='Publish Date' secondary='5' />
                {/* <ListItemSecondaryAction> */}

                <IconButton edge='end' aria-label='deleteFav'>
                  <FavoriteIcon style={{ color: 'red' }} />
                </IconButton>
                {/* </ListItemSecondaryAction> */}
                {/* <ListItemText
                  className={classes.listItemText}
                  primary='awdwad'
                  secondary='awdawdawd'
                  // primary={item.authorName}
                  // secondary={item.title}
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'h6',
                    align: isMd ? 'left' : 'center',
                  }}
                  secondaryTypographyProps={{
                    color: 'textPrimary',
                    align: isMd ? 'left' : 'center',
                  }}
                /> */}
              </ListItem>
            </CardBase>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

FavRecipe.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default FavRecipe;
