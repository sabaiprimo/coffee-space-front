import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Button,
  Typography,
  Grid,
  colors,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { Icon, Image } from 'components/atoms';

import { SectionHeader } from 'components/molecules';
import { CardProduct } from 'components/organisms';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  cardProduct: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: theme.spacing(1),
    boxShadow: 'none',
    '& .card-product__content': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      flex: '1 1 50%',
    },
    '& .card-product__media': {
      minHeight: 300,
      height: '100%',
      flex: '1 1 50%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
      '& .card-product__content': {
        flex: '1 1 100%',
      },
      '& .card-product__media': {
        flex: '1 1 100%',
        width: '100%',
      },
    },
  },
  cardProductReverse: {
    flexDirection: 'row-reverse',
  },
  image: {
    objectFit: 'cover',
  },
  blogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-start',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(3),
    },
  },
  blogTitle: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.primary.main,
    color: 'white',
    margin: theme.spacing(0, 1, 1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
  author: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0),
    },
  },
  searchInputContainer: {
    marginBottom: theme.spacing(3),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0 !important',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  searchButton: {
    maxHeight: 40,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
}));

const PopularNews = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [tempSearchTitle, setTempSearchTitle] = useState();

  const handleChange = (event) => {
    event.persist();
    setTempSearchTitle(event.target.value);
    // dispatch(setSearchTitle(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tempSearchTitle) {
      window.location.href = '/list-articles?searchTitle=' + tempSearchTitle;
    } else {
      window.location.href = '/list-articles';
    }
  };
  const BlogMediaContent = (props) => (
    <Image
      {...props}
      className={classes.image}
      lazyProps={{ width: '100%', height: '300px' }}
    />
  );

  const BlogContent = (props) => (
    <div className={classes.blogContent}>
      <div className={classes.tags}>
        {props.tags.map((item, index) => (
          <Typography variant='caption' className={classes.tag} key={index}>
            {item}
          </Typography>
        ))}
      </div>
      <Typography
        variant='h6'
        color='textPrimary'
        className={classes.blogTitle}
      >
        {props.title}
      </Typography>
      <Typography
        variant='body2'
        color='textPrimary'
        className={classes.author}
      >
        <i>
          {props.author.displayName} -{' '}
          {moment(props.date).format('Do MMM YYYY')}
        </i>
      </Typography>
      <Typography variant='subtitle1' color='textPrimary'>
        {props.subtitle}
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        size='large'
        className={classes.button}
        href={'/single-article/' + props._id}
      >
        Read more
      </Button>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <form onSubmit={handleSubmit}>
        <div className={classes.searchInputContainer} data-aos='fade-up'>
          <FormControl fullWidth variant='outlined'>
            <OutlinedInput
              startAdornment={
                <InputAdornment position='start'>
                  <Icon
                    fontIconClass='fas fa-search'
                    fontIconColor={colors.blueGrey[900]}
                  />
                </InputAdornment>
              }
              onChange={handleChange}
              placeholder='Search for the article'
            />
          </FormControl>
          <Button
            color='primary'
            variant='contained'
            size='large'
            className={classes.searchButton}
            type='submit'
          >
            Search
          </Button>
        </div>
      </form>

      <SectionHeader
        title='The most popular articles'
        subtitle='Popular articles which people love most.'
        subtitleProps={{
          color: 'textPrimary',
        }}
        data-aos='fade-up'
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index} data-aos='fade-up'>
            <CardProduct
              className={clsx(
                classes.cardProduct,
                index % 2 === 1 ? classes.cardProductReverse : {}
              )}
              mediaContent={
                <BlogMediaContent {...item.cover} alt={item.title} />
              }
              cardContent={
                <BlogContent
                  title={item.title}
                  subtitle={item.subtitle}
                  author={item.author}
                  date={item.issueDate}
                  tags={item.tags}
                  _id={item._id}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

PopularNews.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default PopularNews;
