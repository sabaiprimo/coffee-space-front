import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  Content,
  FooterNewsletter,
  Hero,
  SidebarArticles,
  SidebarNewsletter,
  SimilarStories,
  VideoSection,
  CommentSection,
} from './components';

import { content, sidebarArticles, popularCourses } from './data';

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
            <VideoSection />
            <br></br>
            <br></br>
            <Divider />
            <Content data={content} />
            <CommentSection />
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
