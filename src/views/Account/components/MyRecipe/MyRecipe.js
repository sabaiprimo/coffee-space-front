import React, { useState } from 'react';
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
import Pagination from '@material-ui/lab/Pagination';
import { gql, useMutation } from '@apollo/client';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
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
const DELETE_RECIPE = gql`
  mutation deleteRecipe($recipeID: ID!) {
    deleteRecipe(recipeID: $recipeID) {
      _id
    }
  }
`;
const MyRecipe = (props) => {
  const { currentPage, totalPages, data, className, ...rest } = props;

  const classes = useStyles();
  const [recipeData, setRecipeData] = useState(data);
  const [deleteRecipe, resultDeleteMutation] = useMutation(DELETE_RECIPE);

  const handleDeleteRecipe = (e, recipeID) => {
    deleteRecipe({ variables: { recipeID } }).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (event, value) => {
    window.location.href = '/account/?pid=myRecipe&pages=' + value;
  };

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            My Recipes
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} data-aos='fade-up'>
          {recipeData.length > 0 ? (
            <CardBase className={classes.cardBase}>
              {recipeData.map((item, idx) => {
                return (
                  <ListItem
                    disableGutters
                    className={classes.listItem}
                    key={idx}
                  >
                    <ListItemAvatar
                      href={'/single-recipe/' + item._id}
                      className={classes.listItemAvatar}
                    >
                      <a href={'/single-recipe/' + item._id}>
                        <img
                          width='100px'
                          // height='100'
                          className={classes.avatar}
                          src={item.images[0].src}
                        />
                      </a>
                    </ListItemAvatar>

                    <ListItemText primary='Title' secondary={item.title} />
                    <ListItemText
                      primary='Author'
                      secondary={item.author.displayName}
                    />

                    <ListItemText
                      primary='Issue Date'
                      secondary={moment(item.issueDate).format('Do MMM YYYY')}
                    />

                    <IconButton
                      href={'/edit-recipe/' + item._id}
                      edge='end'
                      aria-label='edit'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDeleteRecipe(e, item._id)}
                      edge='end'
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            </CardBase>
          ) : (
            <Typography>You don't have any recipe yet</Typography>
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

MyRecipe.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default MyRecipe;
