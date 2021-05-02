import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Section } from 'components/organisms';
import { PopularNews } from './components';
import { useLocation } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { gql, useQuery } from '@apollo/client';

const SEARCH_TITLE_ARTICLE = gql`
  query searchArticleByTitle(
    $filter: ArticleFilters
    $limit: Int
    $start: Int
  ) {
    articles(filter: $filter, limit: $limit, start: $start) {
      _id
      title
      subtitle
      headline
      author {
        _id
        displayName
        pictureProfile
      }
      cover {
        src
      }
      content {
        text
        images
      }
      issueDate
      tags
    }
  }
`;

const GET_LATEST_ARTICLE = gql`
  query getLatestArticle($limit: Int, $start: Int) {
    articleLatest(limit: $limit, start: $start) {
      _id
      title
      subtitle
      headline
      author {
        _id
        displayName
      }
      cover {
        src
      }
      content {
        text
        images
      }
      issueDate
      tags
    }
  }
`;

const GET_COUNT_ARTICLE = gql`
  query getCountArticle($filter: ArticleFilters) {
    countArticle(filter: $filter)
  }
`;

const useQuerySearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sidebarNewsletter: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  footerNewsletterSection: {
    background: theme.palette.primary.dark,
  },
}));

const ListArticle = () => {
  const classes = useStyles();
  let searchQuery = useQuerySearchParams();
  let searchTitle = searchQuery.get('searchTitle');
  let pages = parseInt(searchQuery.get('pages'));
  const [currentPage, setCurrentPage] = useState(pages ? pages : 1);
  const [countTotal, setCountTotal] = useState(0);
  const [article, setArticle] = useState();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const queryCount = searchTitle
    ? useQuery(GET_COUNT_ARTICLE, {
        variables: { filter: { title: searchTitle } },
      })
    : useQuery(GET_COUNT_ARTICLE);

  const queryArticle = searchTitle
    ? useQuery(SEARCH_TITLE_ARTICLE, {
        variables: {
          limit: 10,
          start: (currentPage - 1) * 10,
          filter: { title: searchTitle },
        },
        onCompleted: (data) => {
          setArticle(data.articles);
        },
      })
    : useQuery(GET_LATEST_ARTICLE, {
        variables: { limit: 10, start: (currentPage - 1) * 10 },
        onCompleted: (data) => {
          setArticle(data.articleLatest);
        },
      });
  const handleChange = (event, value) => {
    window.location.href = searchTitle
      ? '/list-articles/?searchTitle=' + searchTitle + '&pages=' + value
      : '/list-articles/?pages=' + value;
  };

  if (queryArticle.loading || queryCount.loading) {
    return <p>Loading..</p>;
  }

  return (
    <div className={classes.root}>
      <Section>
        <PopularNews
          searchTitle={searchTitle ? searchTitle : ''}
          data={article || []}
        />
        <Grid style={{ marginTop: '5rem' }} container justify='flex-end'>
          <Pagination
            count={Math.ceil(queryCount.data.countArticle / 10)}
            disabled={queryCount.data.countArticle > 10 ? false : true}
            page={currentPage}
            shape='rounded'
            onChange={handleChange}
          />
        </Grid>
      </Section>
    </div>
  );
};

export default ListArticle;
