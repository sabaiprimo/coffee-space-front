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
import moment from 'moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { gql, useMutation } from '@apollo/client';

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
const TOGGLE_FAV_ARTICLE = gql`
  mutation modifyFavArticle($favArticleID: ID!) {
    modifyFavArticle(_id: $favArticleID) {
      isFav
    }
  }
`;
const FavArticle = (props) => {
  const { currentPage, totalPages, data, className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [modifyFavArticle, resultModifyFav] = useMutation(TOGGLE_FAV_ARTICLE);

  const handleChange = (event, value) => {
    window.location.href = '/account/?pid=favArticle&pages=' + value;
  };
  const onClickFav = (e, favArticleID) => {
    e.persist();
    modifyFavArticle({ variables: { favArticleID: favArticleID } }).then(
      window.location.reload()
    );
  };

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            My Favorite Articles
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} data-aos='fade-up'>
          {data.length > 0 ? (
            data.map((data, idx) => {
              return (
                <CardBase className={classes.cardBase} liftUp key={idx}>
                  <ListItem disableGutters className={classes.listItem}>
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <img
                        width='100px'
                        // height='100'
                        className={classes.avatar}
                        src={data.article.cover.src}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary='Title'
                      secondary={data.article.title}
                    />
                    <ListItemText
                      primary='Subtitle'
                      secondary={moment(data.article.issueDate).format(
                        'Do MMM YYYY'
                      )}
                    />

                    <ListItemText
                      primary='Publish Date'
                      secondary={data.article.issueDate}
                    />

                    <IconButton
                      onClick={(e) => onClickFav(e, data._id)}
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
            <Typography>You don't have any favorite article yet</Typography>
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

FavArticle.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default FavArticle;
