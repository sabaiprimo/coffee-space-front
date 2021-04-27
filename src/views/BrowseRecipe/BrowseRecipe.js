import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import { Recipes, Hero, Subscription } from './components';
import { gql, useQuery } from '@apollo/client';

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
  const recipes = useQuery(ALL_RECIPE);
  if (recipes.loading) {
    return <div>loading...</div>;
  } else {
    console.log(recipes);
    console.log(recipes.data.recipes);
    return (
      <div>
        <Hero />

        <Section style={{ maxWidth: false }}>
          <Recipes
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
