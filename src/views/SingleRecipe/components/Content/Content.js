import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Typography, Divider, Grid } from '@material-ui/core';
import clsx from 'clsx';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { userSelector } from '../../../../features/user/UserSlice';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { useSelector, useDispatch } from 'react-redux';

import { Image } from 'components/atoms';
import { gql, useMutation, useQuery } from '@apollo/client';

const CREATE_FAV_RECIPE = gql`
  mutation createFavRecipe($userID: ID!, $recipeID: ID!) {
    addFavRecipe(user: $userID, recipe: $recipeID) {
      _id
      isFav
    }
  }
`;

const TOGGLE_FAV_RECIPE = gql`
  mutation modifyFavRecipe($favRecipeID: ID!) {
    modifyFavRecipe(_id: $favRecipeID) {
      isFav
    }
  }
`;

const CREATE_RATING_RECIPE = gql`
  mutation addRating($userID: ID!, $recipeID: ID!, $rating: Int!) {
    addRating(user: $userID, recipe: $recipeID, rating: $rating) {
      _id
      rating
    }
  }
`;

const EDIT_RATING_RECIPE = gql`
  mutation editRating($ratingID: ID!, $rating: Int!) {
    modifyRating(_id: $ratingID, rating: $rating) {
      _id
      rating
    }
  }
`;

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
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const Content = (props) => {
  const { rating, favrecipe, data, className, ...rest } = props;

  const classes = useStyles();
  const items = [];
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const recipeID = data._id;
  const userID = useSelector(userSelector)._id;

  const [addFavRecipe, resultAddFav] = useMutation(CREATE_FAV_RECIPE);

  const [modifyFavRecipe, resultModifyFav] = useMutation(TOGGLE_FAV_RECIPE);

  const [addRating, resultAddRating] = useMutation(CREATE_RATING_RECIPE);

  const [editRating, resultModifyRating] = useMutation(EDIT_RATING_RECIPE);

  const [userRating, setUserRating] = useState(rating ? rating.rating : 0);

  const [isUserFav, setIsUserFav] = useState(
    favrecipe ? favrecipe.isFav : false
  );

  const getAvgRate = useQuery(GET_RATING_RECIPE, { variables: { recipeID } });
  if (getAvgRate.loading) {
    return <p>Loading...</p>;
  }
  const onChangeFav = (e) => {
    e.persist();
    favrecipe
      ? modifyFavRecipe({ variables: { favRecipeID: favrecipe._id } })
          .then((data) => {
            setIsUserFav(!isUserFav);
          })
          .catch((err) => console.log(err))
      : addFavRecipe({ variables: { userID, recipeID } })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
  };

  const onChangeRate = (e) => {
    e.persist();
    rating
      ? editRating({
          variables: { ratingID: rating._id, rating: parseInt(e.target.value) },
        })
          .then((data) => {
            setUserRating(parseInt(e.target.value));
            window.location.reload();
          })
          .catch((err) => console.log(err))
      : addRating({
          variables: { userID, recipeID, rating: parseInt(e.target.value) },
        })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
  };
  const handleClickFav = () => {};

  return (
    <div className={className} {...rest}>
      <br></br>
      <Typography component='p' variant='h4' color='textPrimary'>
        Ingredients
      </Typography>
      <br></br>
      <div className={classes.section}>
        <div className={classes.section}>
          {data.ingredients.map((value, index) => {
            return (
              <Typography
                component='p'
                variant='h6'
                color='textPrimary'
                key={index}
              >
                {index + 1}. {value}
              </Typography>
            );
          })}
        </div>
      </div>
      <Divider />
      <br></br>
      <Typography component='p' variant='h4' color='textPrimary'>
        Equipments
      </Typography>
      <br></br>
      <div className={classes.section}>
        <div className={classes.section}>
          {data.equipments.map((value, index) => {
            return (
              <Typography
                component='p'
                variant='h6'
                color='textPrimary'
                key={index}
              >
                {index + 1}. {value}
              </Typography>
            );
          })}
        </div>
      </div>
      <Divider />
      <br></br>
      <Typography component='p' variant='h4' color='textPrimary'>
        Directions
      </Typography>
      <br></br>

      <div className={classes.section}>
        {data.directions.map((value, index) => {
          return (
            <Typography
              component='p'
              variant='h6'
              color='textPrimary'
              key={index}
            >
              {value.step}. {value.content}
            </Typography>
          );
        })}
      </div>
      <Carousel images={data.images} />
      <br></br>
      <br></br>
      <br></br>
      <Grid item container alignItems='center' justify='flex-start' xs={4}>
        <Typography
          component='span'
          variant='body1'
          className={classes.fontWeight700}
        >
          Rating:{' '}
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
      </Grid>
      {userID ? (
        <div>
          <Rating
            onChange={onChangeRate}
            name='size-medium'
            value={userRating}
            size='large'
          />
          <div style={{ marginRight: '2rem', float: 'right' }}>
            <StyledRating
              size='large'
              name='customized-color'
              max={1}
              value={parseInt(isUserFav * 1)}
              onChange={onChangeFav}
              // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
              precision={1}
              icon={<FavoriteIcon fontSize='inherit' />}
            />
          </div>
        </div>
      ) : (
        ''
      )}
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
