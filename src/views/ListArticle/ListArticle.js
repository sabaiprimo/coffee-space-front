import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Archive,
  FeaturedArticles,
  FooterNewsletter,
  Hero,
  LatestStories,
  MostViewedArticles,
  PopularNews,
  SidebarArticles,
  SidebarNewsletter,
  Tags,
} from './components';

import {
  popularNews,
  featuredArticles,
  latestStories,
  sidebarArticles,
  mostViewedArticles,
  archive,
  tags,
} from './data';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GET_LATEST_ARTICLE = gql`
  query getLatestArticle($limit: Int) {
    articleLatest(limit: $limit) {
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
        textNumber
        text
        images
      }
      issueDate
      tags
    }
  }
`;

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

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const queryLatestArticle = useQuery(GET_LATEST_ARTICLE, {
    variables: { limit: 3 },
  });

  if (queryLatestArticle.loading) {
    return <p>Loading..</p>;
  }
  return (
    <div className={classes.root}>
      {/* <Hero /> */}
      <Section>
        <PopularNews data={queryLatestArticle.data.articleLatest} />
      </Section>
    </div>
  );
};

export default ListArticle;
