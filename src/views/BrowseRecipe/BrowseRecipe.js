import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import { Recipes, Hero, Subscription } from './components';
import { gql, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { recipeSelector } from '../../features/recipe/RecipeSlice';

import { popularRecipes } from './data';
import { width } from '@material-ui/system';

const ALL_RECIPE = gql`
  query {
    recipes {
      _id
      title
      images {
        src
        srcSet
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
    }
  }
`;

const SEARCH_TITLE_RECIPE = gql`
  query searchRecipeByTitle($recipeTitle: String) {
    recipes(title: $recipeTitle) {
      _id
      title
      images {
        src
        srcSet
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
    }
  }
`;

const useQuerySearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = makeStyles((theme) => ({
  recipesSection: {
    // maxWidth: 1800,
    margin: '0 auto',
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
  sectionAlternate: {
    background: 'transparent',
    backgroundImage: `linear-gradient(180deg, ${theme.palette.background.paper} 40%, ${theme.palette.primary.dark} 0%)`,
  },
}));

const BrowseRecipe = () => {
  const classes = useStyles();
  let searchQuery = useQuerySearchParams();
  let searchTitle = searchQuery.get('searchTitle');
  // const { searchTitle } = useSelector(recipeSelector);
  const [recipeTitle, setRecipeTitle] = useState(searchTitle);

  const recipes = recipeTitle
    ? useQuery(SEARCH_TITLE_RECIPE, { variables: { recipeTitle } })
    : useQuery(ALL_RECIPE);
  if (recipes.loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <Hero />

        <Section style={{ maxWidth: false }}>
          <Recipes
            searchtitle={searchTitle || ''}
            data={recipes.data.recipes}
            className={classes.recipesSection}
          />
        </Section>
        <Section className={classes.paddingBottom0}></Section>
        <SectionAlternate innerNarrowed className={classes.sectionAlternate}>
          <Subscription />
        </SectionAlternate>
      </div>
    );
  }
};

export default BrowseRecipe;
