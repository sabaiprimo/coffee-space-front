import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CardBase } from 'components/organisms';
import {
  useMediaQuery,
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
} from '@material-ui/core';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import { gql, useMutation } from '@apollo/client';
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
const TOGGLE_FAV_RECIPE = gql`
  mutation modifyFavRecipe($favRecipeID: ID!) {
    modifyFavRecipe(_id: $favRecipeID) {
      isFav
    }
  }
`;
const FavRecipe = (props) => {
  const { currentPage, totalPages, data, className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [modifyFavRecipe, resultModifyFav] = useMutation(TOGGLE_FAV_RECIPE);

  const handleChange = (event, value) => {
    window.location.href = '/account/?pid=favRecipe&pages=' + value;
  };
  const onClickFav = (e, favRecipeID) => {
    e.persist();
    modifyFavRecipe({ variables: { favRecipeID: favRecipeID } }).then(
      window.location.reload()
    );
  };

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            My Favorite Recipes
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} data-aos='fade-up'>
          {data.length > 0 ? (
            data.map((item, idx) => {
              return (
                <CardBase className={classes.cardBase} key={idx}>
                  <ListItem disableGutters className={classes.listItem}>
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <img
                        width='100px'
                        className={classes.avatar}
                        src={item.recipe.images[0].src}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary='Title'
                      secondary={item.recipe.title}
                    />
                    <ListItemText
                      primary='Author'
                      secondary={item.recipe.author.displayName}
                    />
                    <ListItemText
                      primary='Issue Date'
                      secondary={moment(item.recipe.issueDate).format(
                        'Do MMM YYYY'
                      )}
                    />

                    <IconButton
                      onClick={(e) => onClickFav(e, item._id)}
                      edge='end'
                      aria-label='deleteFav'
                    >
                      <FavoriteIcon style={{ color: 'red' }} />
                    </IconButton>
                  </ListItem>
                </CardBase>
              );
            })
          ) : (
            <Typography>You don't have any favorite recipe yet</Typography>
          )}
        </Grid>
        <Grid container justify='flex-end'>
          <Pagination
            count={totalPages}
            page={currentPage}
            shape='rounded'
            onChange={handleChange}
          />
        </Grid>
      </Grid>
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
