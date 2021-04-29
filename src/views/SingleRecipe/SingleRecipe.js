import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import {
  Content,
  FooterNewsletter,
  Hero,
  SidebarArticles,
  SidebarNewsletter,
  SimilarStories,
  GeneralInfo,
  CommentSection,
} from './components';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { content, sidebarArticles, popularCourses } from './data';
import { userSelector } from '../../features/user/UserSlice';
import { useSelector } from 'react-redux';

const GET_RECIPE_INFO = gql`
  query getRecipeByID($recipeID: ID!) {
    recipe(_id: $recipeID) {
      _id
      title
      description
      preparationTime
      totalTime
      serving
      roastLevel
      level
      ingredients
      equipments
      directions {
        step
        content
      }
      author {
        _id
        firstName
      }
      images {
        src
      }
    }
  }
`;

const GET_COMMENT_RECIPE = gql`
  query getCommentRecipe($recipeID: ID) {
    comments(recipeID: $recipeID) {
      _id
      userID {
        _id
        displayName
        pictureProfile
      }
      context
      commentDate
    }
  }
`;

const GET_FAVRECIPE_BY_USER = gql`
  query getFavRecipe($userID: ID!, $recipeID: ID!) {
    favRecipe(userID: $userID, recipeID: $recipeID) {
      _id
      isFav
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

const SingleRecipe = () => {
  const classes = useStyles();
  let { id } = useParams();
  const recipeID = id;
  const userID = useSelector(userSelector)._id;
  const queryRecipe = useQuery(GET_RECIPE_INFO, {
    variables: { recipeID },
  });

  const queryComment = useQuery(GET_COMMENT_RECIPE, {
    variables: { recipeID },
  });

  const queryFavRecipe = useQuery(GET_FAVRECIPE_BY_USER, {
    variables: { recipeID, userID },
  });

  if (queryRecipe.loading || queryComment.loading || queryFavRecipe.loading) {
    return <p>Loading..</p>;
  }

  return (
    <div className={classes.root}>
      {/* <Hero
        cover={content.cover}
        title={content.title}
        subtitle={content.subtitle}
        author={content.author}
      /> */}
      <Section>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <GeneralInfo data={queryRecipe.data.recipe} />
            <br></br>
            <br></br>
            <Divider />
            <Content
              favrecipe={queryFavRecipe.data.favRecipe}
              data={queryRecipe.data.recipe}
            />
            <CommentSection
              recipeid={queryRecipe.data.recipe._id}
              comments={queryComment.data.comments}
            />
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Divider />
          </Grid> */}
          <Grid item xs={12} md={4}>
            <SidebarArticles data={sidebarArticles} />
            <SidebarNewsletter className={classes.sidebarNewsletter} />
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <SimilarStories data={popularCourses} />
      </SectionAlternate>
      <SectionAlternate className={classes.footerNewsletterSection}>
        <FooterNewsletter />
      </SectionAlternate>
    </div>
  );
};

export default SingleRecipe;
