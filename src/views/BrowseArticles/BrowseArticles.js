import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  FooterNewsletter,
  LatestStories,
  PopularNews,
  SidebarArticles,
} from './components';
import { gql, useQuery } from '@apollo/client';

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

const GET_FEATURE_ARTICLE = gql`
  query getFeatureArticle($limit: Int) {
    featureArticle(limit: $limit) {
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

const GET_POPULAR_ARTICLE = gql`
  query getPopularArticle {
    popularArticle {
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
const BrowseArticles = () => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const queryLatestArticle = useQuery(GET_LATEST_ARTICLE, {
    variables: { limit: 6 },
  });

  const queryFeatureArticle = useQuery(GET_FEATURE_ARTICLE, {
    variables: { limit: 4 },
  });

  const queryPopular = useQuery(GET_POPULAR_ARTICLE);

  if (
    queryLatestArticle.loading ||
    queryFeatureArticle.loading ||
    queryPopular.loading
  ) {
    return <p>Loading..</p>;
  }

  return (
    <div className={classes.root}>
      <Section>
        <PopularNews data={queryPopular.data.popularArticle} />
      </Section>
      <Section>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} md={8}>
            <LatestStories data={queryLatestArticle.data.articleLatest} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SidebarArticles data={queryFeatureArticle.data.featureArticle} />
          </Grid>
        </Grid>
      </Section>

      <SectionAlternate className={classes.footerNewsletterSection}>
        <FooterNewsletter />
      </SectionAlternate>
    </div>
  );
};

export default BrowseArticles;
