import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Typography,
  GridList,
  GridListTile,
} from '@material-ui/core';

import { Image } from 'components/atoms';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import { gql, useMutation, useQuery } from '@apollo/client';
import { userSelector } from '../../../../features/user/UserSlice';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useSelector, useDispatch } from 'react-redux';

const CREATE_FAV_ARTICLE = gql`
  mutation createFavArticle($userID: ID!, $articleID: ID!) {
    addFavArticle(user: $userID, article: $articleID) {
      _id
      isFav
    }
  }
`;
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);
const TOGGLE_FAV_ARTICLE = gql`
  mutation modifyFavArticle($favArticleID: ID!) {
    modifyFavArticle(_id: $favArticleID) {
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

const Content = (props) => {
  const { favArticle, data, className, ...rest } = props;
  const classes = useStyles();
  const [isUserFav, setIsUserFav] = useState(
    favArticle ? favArticle.isFav : false
  );
  const articleID = data._id;
  const userID = useSelector(userSelector)._id;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [addFavArticle, resultAddFav] = useMutation(CREATE_FAV_ARTICLE);

  const [modifyFavArticle, resultModifyFav] = useMutation(TOGGLE_FAV_ARTICLE);
  const onChangeFav = (e) => {
    e.persist();
    favArticle
      ? modifyFavArticle({ variables: { favArticleID: favArticle._id } })
          .then((data) => {
            setIsUserFav(!isUserFav);
          })
          .catch((err) => console.log(err))
      : addFavArticle({ variables: { userID, articleID } })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className={className} {...rest}>
      <div className={classes.section}>
        <Typography component='p' variant='h6' color='textPrimary'>
          {data.headline}
        </Typography>
      </div>
      <div className={classes.section}>
        <Image
          {...data.cover}
          className={classes.image}
          lazyProps={{ width: '100%', height: '100%' }}
        />
      </div>

      {data.content.map((value, index) => {
        return (
          <div className={classes.section} key={index}>
            <div className={classes.section}>
              <Typography component='p' variant='h6' color='textPrimary'>
                {value.text}
              </Typography>
            </div>
            <div className={classes.section}>
              <GridList
                cellHeight={isMd ? 360 : 260}
                cols={2}
                spacing={isMd ? 24 : 8}
              >
                {value.images.length % 2 == 0
                  ? value.images.map((item, index) => (
                      <GridListTile key={index} cols={1}>
                        <Image
                          src={item}
                          className={classes.image}
                          lazyProps={{ width: '100%', height: '100%' }}
                        />
                      </GridListTile>
                    ))
                  : value.images.map((item, index) => (
                      <GridListTile key={index} cols={index == 0 ? 2 : 1}>
                        <Image
                          src={item}
                          className={classes.image}
                          lazyProps={{ width: '100%', height: '100%' }}
                        />
                      </GridListTile>
                    ))}
              </GridList>
            </div>
          </div>
        );
      })}
      {userID ? (
        <div>
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
