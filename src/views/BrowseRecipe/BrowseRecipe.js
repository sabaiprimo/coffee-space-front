import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Search,
  Categories,
  Recipes,
  Hero,
  PromoNumbers,
  Reviews,
  Subscription,
} from './components';

import {
  promoNumbers,
  recipeCategories,
  popularRecipes,
  reviews,
} from './data';
import { width } from '@material-ui/system';

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

  return (
    <div>
      <Hero />
      {/* <Section><PromoNumbers data={promoNumbers} /></Section>
      <SectionAlternate>
        <Search />
      </SectionAlternate> */}
      <Section style={{ maxWidth: false }}>
        {/* <> */}
        {/* <Categories data={recipeCategories} /> */}
        {/* <Section>
            <Divider />
          </Section> */}

        <Recipes data={popularRecipes} className={classes.recipesSection} />

        {/* </> */}
      </Section>
      <Section className={classes.paddingBottom0}>
        {/* <Reviews data={reviews} /> */}
      </Section>
      <SectionAlternate innerNarrowed className={classes.sectionAlternate}>
        <Subscription />
      </SectionAlternate>
    </div>
  );
};

export default BrowseRecipe;
