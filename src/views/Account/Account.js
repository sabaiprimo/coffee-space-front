import React from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import {
  Hero,
  General,
  Security,
  MyArticle,
  FavArticle,
  FavRecipe,
  MyRecipe,
} from './components';

import { gql, useQuery, useMutation } from '@apollo/client';
import { userSelector } from '../../features/user/UserSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const MY_RECIPES = gql`
  query getUserRecipe($userID: ID!, $limit: Int, $start: Int) {
    myRecipe(userID: $userID, limit: $limit, start: $start) {
      _id
      title
      images {
        src
      }
      author {
        displayName
      }
      issueDate
    }
  }
`;
const MY_ARTICLES = gql`
  query getUserArticle($userID: ID!, $limit: Int, $start: Int) {
    myArticle(userID: $userID, limit: $limit, start: $start) {
      _id
      title
      subtitle
      issueDate
      cover {
        src
      }
    }
  }
`;

const MY_FAV_ARTICLES = gql`
  query getUserFavArticle($userID: ID!, $limit: Int, $start: Int) {
    myFavArticle(userID: $userID, limit: $limit, start: $start) {
      _id
      article {
        _id
        title
        subtitle
        issueDate
        cover {
          src
        }
      }
    }
  }
`;

const MY_FAV_RECIPES = gql`
  query getUserFavRecipe($userID: ID!, $limit: Int, $start: Int) {
    myFavRecipe(userID: $userID, limit: $limit, start: $start) {
      _id
      recipe {
        _id
        title
        images {
          src
        }
        author {
          displayName
        }
        issueDate
      }
    }
  }
`;

const COUNT_MY_ARTICLE = gql`
  query countMyArticle($userID: ID!) {
    countMyArticle(userID: $userID)
  }
`;

const COUNT_MY_FAVARTICLE = gql`
  query countMyFavArticle($userID: ID!) {
    countFavArticle(userID: $userID)
  }
`;
const COUNT_MY_RECIPE = gql`
  query countMyRecipe($userID: ID!) {
    countMyRecipe(userID: $userID)
  }
`;
const COUNT_MY_FAVRECIPE = gql`
  query countMyFavRecipe($userID: ID!) {
    countFavRecipe(userID: $userID)
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

const subPages = [
  {
    id: 'general',
    href: '/account/?pid=general',
    title: 'General',
  },
  {
    id: 'security',
    href: '/account/?pid=security',
    title: 'Security',
  },
  {
    id: 'myArticle',
    href: '/account/?pid=myArticle',
    title: 'My Article',
  },
  {
    id: 'myRecipe',
    href: '/account/?pid=myRecipe',
    title: 'My Recipe',
  },
  {
    id: 'favArticle',
    href: '/account/?pid=favArticle',
    title: 'Favorite Article',
  },
  {
    id: 'favRecipe',
    href: '/account/?pid=favRecipe',
    title: 'Favorite Recipe',
  },
];

const useQuerySearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box component='div' hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
};

const Account = (props = {}) => {
  const classes = useStyles();
  let pageId = parse(window.location.search).pid || 'general';
  const userID = useSelector(userSelector)._id;
  let searchQuery = useQuerySearchParams();

  let currentPage = parseInt(
    searchQuery.get('pages') ? searchQuery.get('pages') : 1
  );
  const queryMyRecipe = useQuery(MY_RECIPES, {
    variables: { userID, limit: 10, start: (currentPage - 1) * 10 },
  });
  const queryMyArticle = useQuery(MY_ARTICLES, {
    variables: { userID, limit: 10, start: (currentPage - 1) * 10 },
  });
  const queryMyFavArticle = useQuery(MY_FAV_ARTICLES, {
    variables: { userID, limit: 10, start: (currentPage - 1) * 10 },
  });
  const queryMyFavRecipe = useQuery(MY_FAV_RECIPES, {
    variables: { userID, limit: 10, start: (currentPage - 1) * 10 },
  });

  const countArticle = useQuery(COUNT_MY_ARTICLE, {
    variables: { userID },
  });
  const countRecipe = useQuery(COUNT_MY_RECIPE, {
    variables: { userID },
  });
  const countFavRecipe = useQuery(COUNT_MY_FAVRECIPE, {
    variables: { userID },
  });
  const countFavArticle = useQuery(COUNT_MY_FAVARTICLE, {
    variables: { userID },
  });

  if (
    queryMyArticle.loading ||
    queryMyFavArticle.loading ||
    queryMyRecipe.loading ||
    queryMyFavRecipe.loading ||
    countFavArticle.loading ||
    countFavRecipe.loading ||
    countArticle.loading ||
    countRecipe.loading
  ) {
    return <p>Loading..</p>;
  }

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align='left' className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item, index) => (
                  <ListItem
                    key={index}
                    component={'a'}
                    href={item.href}
                    className={clsx(
                      classes.listItem,
                      pageId === item.id ? classes.listItemActive : {}
                    )}
                    disableGutters
                  >
                    <Typography
                      variant='subtitle1'
                      noWrap
                      color='textSecondary'
                      className='menu__item'
                    >
                      {item.title}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align='left'>
              <TabPanel value={pageId} index={'general'}>
                <General />
              </TabPanel>
              <TabPanel value={pageId} index={'security'}>
                <Security />
              </TabPanel>

              <TabPanel value={pageId} index={'myArticle'}>
                <MyArticle
                  data={queryMyArticle.data.myArticle}
                  totalPages={Math.ceil(countArticle.data.countMyArticle / 10)}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel value={pageId} index={'myRecipe'}>
                <MyRecipe
                  data={queryMyRecipe.data.myRecipe}
                  totalPages={Math.ceil(countRecipe.data.countMyRecipe / 10)}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel value={pageId} index={'favRecipe'}>
                <FavRecipe
                  data={queryMyFavRecipe.data.myFavRecipe}
                  totalPages={Math.ceil(
                    countFavRecipe.data.countFavRecipe / 10
                  )}
                  currentPage={currentPage}
                />
              </TabPanel>
              <TabPanel value={pageId} index={'favArticle'}>
                <FavArticle
                  data={queryMyFavArticle.data.myFavArticle}
                  totalPages={Math.ceil(
                    countFavArticle.data.countFavArticle / 10
                  )}
                  currentPage={currentPage}
                />
              </TabPanel>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default Account;
