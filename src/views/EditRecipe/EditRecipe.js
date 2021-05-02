import React from 'react';

import { useParams } from 'react-router-dom';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import { Hero, MainForm } from './components';
import { gql, useQuery } from '@apollo/client';

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
        displayName
      }
      images {
        src
      }
    }
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
  sidebarNewsletter: {
    marginTop: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
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

const EditRecipe = (props = {}) => {
  const classes = useStyles();
  let pageId = parse(window.location.search).pid || 'general';
  let { id } = useParams();
  const recipeID = id;
  const queryRecipe = useQuery(GET_RECIPE_INFO, {
    variables: { recipeID },
  });
  if (queryRecipe.loading) {
    return <p>Loading..</p>;
  }

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CardBase withShadow align='left'>
              <MainForm data={queryRecipe.data.recipe} />
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default EditRecipe;
