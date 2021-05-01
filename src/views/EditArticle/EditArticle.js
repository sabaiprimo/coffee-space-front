import React from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import { Hero, MainForm, GeneralInfoForm } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box component='div' hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  );
};

const CreateRecipe = (props = {}) => {
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
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CardBase withShadow align='left'>
              <MainForm data={article} />
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default CreateRecipe;
