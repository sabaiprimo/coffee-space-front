import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  colors,
  Avatar,
  Button,
  NoSsr,
} from '@material-ui/core';
import { Image, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardProduct } from 'components/organisms';
import icon1 from '../../../../assets/icons/coffee-recipe-gen/hourglass.svg';
import icon2 from '../../../../assets/icons/coffee-recipe-gen/stopwatch.svg';
import icon3 from '../../../../assets/icons/coffee-recipe-gen/hot-cup.svg';
import icon4 from '../../../../assets/icons/coffee-recipe-gen/cooking.svg';
import icon5 from '../../../../assets/icons/coffee-recipe-gen/sack.svg';
import { Link } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_RATING_RECIPE = gql`
  query getRating($recipeID: ID!) {
    avgRatingRecipe(recipeID: $recipeID) {
      _id
      avgRate
      reviews
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  cardProduct: {
    borderRadius: theme.spacing(3),
  },
  courseCardPrice: {
    padding: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  courseCardReviewAvatar: {
    marginLeft: theme.spacing(-2),
    border: `3px solid ${theme.palette.background.paper}`,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  courseCardReviewStar: {
    color: colors.yellow[800],
    marginRight: theme.spacing(1 / 2),
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  image: {
    objectFit: 'cover',
  },
  fontWeight700: {
    fontWeight: 700,
  },
  generalInfo: {
    color: 'rgb(89,89,89)',
    fontSize: '0.8rem',
    fontWeight: 600,
    margin: '0.5rem',
  },
}));

const coffeeIconStyle = {
  display: 'inline-block',
  color: 'black',
};

const Recipes = (props) => {
  const {
    // limitContent,
    // setLimitContent,
    data,
    className,
    searchTitle,
    ...rest
  } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [limitContent, setLimitContent] = useState(6);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   window.location.replace(
  //     '/browse-recipe?searchTitle=' + searchTitle + '?limit=' + limit
  //   );
  // };
  const EachRecipe = (props) => {
    const { item } = props;
    const getAvgRate = useQuery(GET_RATING_RECIPE, {
      variables: { recipeID: item._id },
    });
    if (getAvgRate.loading) {
      return <p>Loading...</p>;
    }
    return (
      <Grid item xs={12} sm={12} md={6} data-aos='fade-up'>
        <CardProduct
          className={classes.cardProduct}
          withShadow
          liftUp
          mediaContent={
            <>
              <Image
                {...item.images[0]}
                alt={item.title}
                lazyProps={{ width: '100%', height: '100%' }}
                className={classes.image}
              />
              <div className={classes.courseCardPrice}>
                <NoSsr>
                  <i
                    className={
                      getAvgRate.data.avgRatingRecipe
                        ? clsx('fas fa-star', classes.courseCardReviewStar)
                        : clsx('fas fa-star')
                    }
                  />
                </NoSsr>
                <Typography
                  component='span'
                  variant='body1'
                  className={classes.fontWeight700}
                >
                  {getAvgRate.data.avgRatingRecipe
                    ? getAvgRate.data.avgRatingRecipe.avgRate
                    : ''}{' '}
                </Typography>
                <Typography
                  noWrap
                  component='span'
                  variant='body2'
                  color='textSecondary'
                  className={classes.reviewCount}
                >
                  (
                  {getAvgRate.data.avgRatingRecipe
                    ? getAvgRate.data.avgRatingRecipe.reviews
                    : 0}{' '}
                  {getAvgRate.data.avgRatingRecipe
                    ? getAvgRate.data.avgRatingRecipe.reviews > 1
                      ? 'reviews'
                      : 'review'
                    : 'review'}
                  )
                </Typography>
              </div>
            </>
          }
          cardContent={
            <Grid container spacing={1}>
              <div
                style={{
                  color: 'black',
                  // backgroundColor: 'DodgerBlue',
                  padding: '10px',
                  fontFamily: 'Arial',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <img
                  style={{
                    maxWidth: '10%',
                  }}
                  src={icon1}
                  alt='Facebook'
                />
                <p className={classes.generalInfo}>
                  {item.preparationTime} mins
                </p>

                <img
                  style={{
                    maxWidth: '10%',
                  }}
                  src={icon2}
                  alt='Facebook'
                />
                <p className={classes.generalInfo}>{item.totalTime} mins</p>

                <img
                  style={{
                    maxWidth: '10%',
                  }}
                  src={icon3}
                  alt='Facebook'
                />
                <p className={classes.generalInfo}>{item.serving} cup</p>

                <img
                  style={{
                    maxWidth: '10%',
                  }}
                  src={icon4}
                  alt='Facebook'
                />
                <p className={classes.generalInfo}>{item.level}</p>

                <img
                  style={{
                    maxWidth: '10%',
                  }}
                  src={icon5}
                  alt='Facebook'
                />
                <p className={classes.generalInfo}>{item.roastLevel}</p>
              </div>

              <Grid item xs={12}>
                <Typography
                  variant='h6'
                  color='textPrimary'
                  align='left'
                  className={classes.fontWeight700}
                >
                  {item.title}
                </Typography>
              </Grid>
              <Grid item container alignItems='center' xs={12}>
                <Avatar
                  // className={classes.courseCardReviewAvatar}
                  alt={item.author.displayName}
                  src={item.author.pictureProfile}
                />

                <Typography
                  style={{ marginLeft: '1rem' }}
                  variant='body1'
                  color='textSecondary'
                  align='left'
                >
                  {item.author.displayName}
                </Typography>
              </Grid>
              {/* <Grid item container justify='space-between' xs={12}>
                    <Grid item container xs={6} wrap='nowrap'>
                      {item.reviews.map((review, index) => (
                        
                      ))}
                    </Grid>
                    <Grid
                      item
                      container
                      alignItems='center'
                      justify='flex-end'
                      xs={6}
                    >
                      <NoSsr>
                        <i
                          className={clsx(
                            'fas fa-star',
                            classes.courseCardReviewStar
                          )}
                        />
                      </NoSsr>
                      <Typography
                        component='span'
                        variant='body1'
                        className={classes.fontWeight700}
                      >
                        {item.score}
                      </Typography>
                      <Typography
                        noWrap
                        component='span'
                        variant='body2'
                        color='textSecondary'
                        className={classes.reviewCount}
                      >
                        ({item.reviewCount} reviews)
                      </Typography>
                    </Grid>
                  </Grid> */}

              <Grid item xs={12}>
                <LearnMoreLink
                  href={'/single-recipe/' + item._id}
                  title='Learn more'
                  variant='body1'
                  color='primary'
                />
              </Grid>
            </Grid>
          }
        />
      </Grid>
    );
  };
  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          searchTitle === '' ? (
            <span>
              Browse our{' '}
              <Typography color='secondary' variant='inherit' component='span'>
                popular recipe
              </Typography>
            </span>
          ) : (
            <span>
              Recipes contain{' '}
              <Typography color='secondary' variant='inherit' component='span'>
                {searchTitle}
              </Typography>
            </span>
          )
        }
        subtitle={
          searchTitle === ''
            ? 'Here are our reccommend recipe you might want to try.'
            : ''
        }
        fadeUp
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.map((item, index) =>
          index < limitContent ? <EachRecipe key={index} item={item} /> : ''
        )}
      </Grid>
      <Grid style={{ marginTop: '4rem' }} container justify='center'>
        <Grid item>
          {/* <Link
            to={
              searchTitle.length > 0
                ? '/browse-recipe?searchTitle=' +
                  searchTitle +
                  '&limit=' +
                  (parseInt(limit) + 6)
                : '/browse-recipe?limit=' + (parseInt(limit) + 6)
            }
          > */}
          <Button
            onClick={() => setLimitContent(limitContent + 6)}
            color='primary'
            variant='contained'
            size='large'
          >
            View More
          </Button>
          {/* </Link> */}
        </Grid>
      </Grid>
    </div>
  );
};

Recipes.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Recipes;
