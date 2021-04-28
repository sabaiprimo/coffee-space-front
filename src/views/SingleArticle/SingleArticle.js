import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
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

import { content, sidebarArticles, similarStories } from './data';

const GET_ARTICLE_BY_ID = gql`
  query getArticleByID($articleID: ID!) {
    article(_id: $articleID) {
      _id
      title
      subtitle
      headline
      author {
        _id
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
  const queryArticle = useQuery(GET_ARTICLE_BY_ID, {
    variables: { articleID },
  });
  if (queryArticle.loading) {
    return <p>Loading..</p>;
  }
  const article = queryArticle.data.article;
  console.log(article);
  return (
    <div className={classes.root}>
      <Hero
        cover={article.cover}
        title={article.title}
        subtitle={article.subtitle}
        author={article.author}
      />
      <Section>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Content data={article} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SidebarArticles data={sidebarArticles} />
            <SidebarNewsletter className={classes.sidebarNewsletter} />
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <SimilarStories data={similarStories} />
      </SectionAlternate>
      <SectionAlternate className={classes.footerNewsletterSection}>
        <FooterNewsletter />
      </SectionAlternate>
    </div>
  );
};

export default SingleArticle;
