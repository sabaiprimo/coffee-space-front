import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, colors } from '@material-ui/core';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    '&:hover': {
      borderRight: `${theme.spacing(1)}px solid ${
        theme.palette.secondary.main
      }`,
    },
  },
  dot: {
    display: 'inline-block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    background: theme.palette.text.primary,
    borderRadius: '100%',
    marginRight: theme.spacing(1),
  },
  dotBig: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  dotSmall: {
    width: theme.spacing(1 / 2),
    height: theme.spacing(1 / 2),
  },
  jobTitle: {
    fontWeight: 700,
  },
  dotMargin: {
    margin: theme.spacing(0, 1),
  },
  tag: {
    display: 'inline-block',
    padding: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1 / 2),
    border: '1px solid',
  },
  textWhite: {
    color: 'white',
  },
}));

/**
 * Component to display the job card
 *
 * @param {Object} props
 */
const RecipeGeneral = (props) => {
  const { className, data, ...rest } = props;

  const classes = useStyles();

  return (
    <CardBase className={clsx(classes.root, className)} align='left' {...rest}>
      <>
        <Grid container spacing={2}>
          <Grid item container alignItems='center' xs={12}>
            <Typography
              component='span'
              variant='subtitle1'
              color='textSecondary'
            >
              <h4>Prep: &nbsp;&nbsp;</h4>
            </Typography>
            <span>
              {data.preparationTime} {data.preparationTime > 1 ? 'mins' : 'min'}
            </span>
          </Grid>
          <Grid item container alignItems='center' xs={12}>
            <Typography
              component='span'
              variant='subtitle1'
              color='textSecondary'
            >
              <h4>Total: &nbsp;&nbsp;</h4>
            </Typography>
            <span>
              {data.totalTime} {data.totalTime > 1 ? 'mins' : 'min'}
            </span>
          </Grid>
          <Grid item container alignItems='center' xs={12}>
            <Typography
              component='span'
              variant='subtitle1'
              color='textSecondary'
            >
              <h4>Serving: &nbsp;&nbsp;</h4>
            </Typography>
            <span>
              {data.serving} {data.serving > 1 ? 'cups' : 'cup'}
            </span>
          </Grid>
          <Grid item container alignItems='center' xs={12}>
            <Typography
              component='span'
              variant='subtitle1'
              color='textSecondary'
            >
              <h4>Level: &nbsp;&nbsp;</h4>
            </Typography>
            <span> {data.level} </span>
          </Grid>
          <Grid item container alignItems='center' xs={12}>
            <Typography
              component='span'
              variant='subtitle1'
              color='textSecondary'
            >
              <h4>Roast: &nbsp;&nbsp;</h4>
            </Typography>
            <span> {data.roastLevel}</span>
          </Grid>
        </Grid>
      </>
    </CardBase>
  );
};

export default RecipeGeneral;
