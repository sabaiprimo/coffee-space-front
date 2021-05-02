import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Content,
  FooterNewsletter,
  Hero,
  SidebarArticles,
  SidebarNewsletter,
  SimilarStories,
} from './components';
import { gql, useQuery } from '@apollo/client';
import { userSelector } from '../../features/user/UserSlice';

import { useSelector } from 'react-redux';

const GET_ARTICLE_BY_ID = gql`
  query getArticleByID($articleID: ID!) {
    article(_id: $articleID) {
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

const GET_FAVARTICLE_BY_USER = gql`
  query getFavArticle($userID: ID!, $articleID: ID!) {
    favArticle(userID: $userID, articleID: $articleID) {
      _id
      isFav
    }
  }
`;

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

const GET_SIMILAR_ARTICLE = gql`
  query getSimilarArticle($articleID: ID, $limit: Int) {
    similarArticle(articleID: $articleID, limit: $limit) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sidebarNewsletter: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  footerNewsletterSection: {
    background: theme.palette.primary.dark,
  },
}));

const SingleArticle = () => {
  const classes = useStyles();
  let { id } = useParams();
  const articleID = id;
  const userID = useSelector(userSelector)._id;
  const queryArticle = useQuery(GET_ARTICLE_BY_ID, {
    variables: { articleID },
  });

  const queryLatestArticle = useQuery(GET_LATEST_ARTICLE, {
    variables: { limit: 6 },
  });

  const queryFavArticle = useQuery(GET_FAVARTICLE_BY_USER, {
    variables: { articleID, userID },
  });

  const querySimilarArticle = useQuery(GET_SIMILAR_ARTICLE, {
    variables: { articleID, limit: 3 },
  });
  if (
    queryArticle.loading ||
    queryFavArticle.loading ||
    queryLatestArticle.loading ||
    querySimilarArticle.loading
  ) {
    return <p>Loading..</p>;
  }
  const article = queryArticle.data.article;
  return (
    <div className={classes.root}>
      <Hero
        cover={article.cover}
        title={article.title}
        subtitle={article.subtitle}
        author={article.author}
        issueDate={article.issueDate}
      />
      <Section>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Content
              data={article}
              favArticle={
                queryFavArticle.data ? queryFavArticle.data.favArticle : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SidebarArticles data={queryLatestArticle.data.articleLatest} />
            <SidebarNewsletter className={classes.sidebarNewsletter} />
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <SimilarStories data={querySimilarArticle.data.similarArticle} />
      </SectionAlternate>
      <SectionAlternate className={classes.footerNewsletterSection}>
        <FooterNewsletter />
      </SectionAlternate>
    </div>
  );
};

export default SingleArticle;
