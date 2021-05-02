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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';

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

const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleID: ID!) {
    deleteArticle(articleID: $articleID) {
      _id
    }
  }
`;

const MyArticle = (props) => {
  const { currentPage, totalPages, data, className, ...rest } = props;
  const classes = useStyles();
  const [deleteArticle, resultDeleteMutation] = useMutation(DELETE_ARTICLE);

  const handleDeleteArticle = (e, articleID) => {
    deleteArticle({ variables: { articleID } }).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (event, value) => {
    window.location.href = '/account/?pid=myArticle&pages=' + value;
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
            My Articles
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} data-aos='fade-up'>
          <CardBase className={classes.cardBase}>
            {data.length > 0 ? (
              data.map((item, idx) => {
                return (
                  <ListItem
                    disableGutters
                    className={classes.listItem}
                    key={idx}
                  >
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <a href={'/single-article/' + item._id}>
                        <img
                          width='100px'
                          // height='100'
                          className={classes.avatar}
                          src={item.cover.src}
                        />
                      </a>
                    </ListItemAvatar>
                    <ListItemText primary='Title' secondary={item.title} />
                    <ListItemText
                      primary='Subtitle'
                      secondary={moment(item.issueDate).format('Do MMM YYYY')}
                    />
                    <ListItemText
                      primary='Publish Date'
                      secondary={item.issueDate}
                    />

                    <IconButton
                      href={'/edit-article/' + item._id}
                      edge='end'
                      aria-label='edit'
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDeleteArticle(e, item._id)}
                      edge='end'
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            ) : (
              <Typography>You don't have any article yet</Typography>
            )}
          </CardBase>
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

MyArticle.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default MyArticle;
