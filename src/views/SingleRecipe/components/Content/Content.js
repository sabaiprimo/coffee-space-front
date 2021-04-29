import React, { useState } from 'react';
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
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { userSelector } from '../../../../features/user/UserSlice';

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
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

// React.useEffect(() => {
//   const errors = validate(formState.values, schema);

//   setFormState((formState) => ({
//     ...formState,
//     isValid: errors ? false : true,
//     errors: errors || {},
//   }));
// }, [formState.values]);

const Content = (props) => {
  const { favrecipe, data, className, ...rest } = props;

  const classes = useStyles();
  const items = [];
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const recipeID = data._id;
  const userID = useSelector(userSelector)._id;
  console.log('recipeID: ', recipeID);
  console.log('userID: ', userID);

  const [addFavRecipe, resultAddFav] = useMutation(CREATE_FAV_RECIPE);

  const [modifyFavRecipe, resultModifyFav] = useMutation(TOGGLE_FAV_RECIPE);

  const [isUserFav, setIsUserFav] = useState(
    favrecipe ? favrecipe.isFav : false
  );

  // const isFav = queryFavRecipe.data.favRecipe
  //   ? queryFavRecipe.data.favRecipe.isFav
  //   : false;

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
    // setIsUserFav(!isUserFav);
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
      <div>
        <Rating name='size-medium' defaultValue={2} size='large' />
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
