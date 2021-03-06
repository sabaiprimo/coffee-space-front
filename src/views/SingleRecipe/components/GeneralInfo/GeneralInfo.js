import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Grid, Button, Typography } from '@material-ui/core';
import { RecipeGeneral } from 'components/organisms';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import coffee1 from '../../../../assets/images/coffee-recipe/coffee1.jpg';

const useStyles = makeStyles((theme) => ({
  video: {
    position: 'relative',
  },
  videoCover: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.primary.main,
    opacity: '0.3',
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
  },
  videoPlayButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: 70,
    zIndex: 1300,
    boxShadow: `0 8px 21px 0 ${theme.palette.cardShadow}`,
    borderRadius: '100%',
  },
  coffeeImage: {
    height: '00%',
  },
}));

const GeneralInfo = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} data-aos='fade-up' {...rest}>
      <SectionHeader
        title={
          <span>
            <Typography component='span' variant='inherit' color='primary'>
              {data.title}
            </Typography>
          </span>
        }
        subtitle={data.description}
        align={isMd ? 'left' : 'center'}
      />
      <Grid
        container
        justify='space-between'
        spacing={isMd ? 4 : 2}
        direction='row-reverse'
      >
        <Grid item xs={12} md={6} data-aos={'fade-up'}>
          <Grid container alignItems='flex-start'>
            <Grid item xs={12}>
              <RecipeGeneral data={data} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} data-aos={'fade-up'}>
          <Image
            style={{
              resizeMode: 'cover',
            }}
            src={data.images[0].src}
            alt='Latte'
          />
        </Grid>
      </Grid>
    </div>
  );
};

GeneralInfo.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default GeneralInfo;
