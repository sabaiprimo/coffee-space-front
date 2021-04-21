import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  fontWeight900: {
    fontWeight: 900,
  },
  disablePadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const reviewGroup1 = [
  {
    name: 'Deepak Kapiswe',
    date: 'December 11, 2020',
    feedback: `Laborum officia cupidatat voluptate anim deserunt nulla minim qui consectetur nostrud.`,
  },
  {
    name: '@mpazaryna',
    date: 'November 11, 2020',
    feedback: `Commodo quis elit ea cillum ea. Dolor tempor veniam ut dolore mollit elit proident id. Reprehenderit fugiat adipisicing velit qui minim eiusmod. In laborum commodo velit ex voluptate. Minim veniam pariatur anim incididunt cupidatat reprehenderit proident eiusmod laborum cupidatat magna elit veniam. Commodo sit dolor esse fugiat laborum sint. Dolor ipsum tempor qui qui culpa minim id sit duis proident.`,
  },
  {
    name: '@gkranasinghe',
    date: 'November 9, 2020',
    feedback: `Sit enim deserunt aliqua amet occaecat occaecat irure culpa non quis Lorem ad. Nulla pariatur fugiat nostrud ipsum ipsum fugiat ullamco sit ex ad. Irure voluptate sint proident dolore proident laboris et labore voluptate eu eu excepteur nostrud. Laborum laborum in ullamco deserunt ex incididunt nisi velit enim consequat anim. Cupidatat fugiat cillum pariatur cillum sint. Enim amet velit qui laborum aliqua ex cupidatat laboris fugiat.`,
  },
  {
    name: 'Daniel Still',
    date: 'November 8, 2020',
    feedback: `Quis irure minim nulla amet dolor labore eiusmod non quis minim ipsum pariatur sunt enim. Adipisicing esse minim proident ad mollit duis ullamco amet exercitation anim ut. Excepteur fugiat ex anim sit. Lorem aute Lorem proident elit Lorem excepteur exercitation ex elit irure et. Qui cillum occaecat enim fugiat minim ea laboris qui quis mollit adipisicing. In est quis sunt do esse labore ullamco eiusmod nostrud ullamco do reprehenderit deserunt deserunt. Aliqua sunt aliquip culpa laborum excepteur dolore elit.`,
  },
];

const reviewGroup2 = [
  {
    name: 'Michael',
    date: 'November 2, 2020',
    feedback: `Proident eiusmod incididunt dolore fugiat non eiusmod adipisicing voluptate.`,
  },
  {
    name: 'Rachel Christensen',
    date: 'November 2, 2020',
    feedback: `Esse ex amet et non eiusmod excepteur ullamco mollit cillum. Dolor aute consequat aute exercitation ad pariatur consequat cillum consequat proident magna nulla irure sint. Quis voluptate cupidatat ipsum esse velit anim ipsum ad laboris tempor reprehenderit labore. Exercitation officia labore irure labore nulla eu. Sunt cillum veniam proident veniam labore proident ut quis sunt do.`,
  },
  {
    name: 'Rachel Christensen',
    date: 'November 2, 2020',
    feedback: `Irure cillum eiusmod minim est nulla duis quis.`,
  },
  {
    name: 'yaniv nizry',
    date: 'October 23, 2020',
    feedback: `Sit non veniam nulla proident sit aute. Cillum tempor occaecat irure id sunt eu laborum quis. Esse et officia enim aliquip in non nulla proident fugiat mollit dolore eu sunt irure. Minim amet commodo aute nisi nostrud nostrud est eu quis eiusmod magna reprehenderit ea. Veniam officia qui magna esse irure eu voluptate exercitation.`,
  },
];

const reviewGroup3 = [
  {
    name: '@marampilly.sarath',
    date: 'January 1, 2021',
    feedback:
      'Et pariatur do officia mollit mollit irure ea et Lorem adipisicing. Ad cillum cillum officia commodo. In sunt eu veniam eu aute eu aliqua do fugiat. Aliqua quis ut occaecat anim nostrud et.',
  },
  {
    name: 'Gal Lev',
    date: 'October 5, 2020',
    feedback: `Consequat reprehenderit dolor officia aliquip veniam ipsum eiusmod.`,
  },
  {
    name: '@krzysztof.pier27',
    date: 'September 25, 2020',
    feedback: `Enim in voluptate labore pariatur veniam ullamco enim excepteur.`,
  },
  {
    name: 'Karthik Divi',
    date: 'September 11, 2020',
    feedback: `In ea exercitation velit culpa in commodo nostrud nulla.`,
  },
  {
    name: 'Nick Friedman',
    date: 'August 14, 2020',
    feedback: `Do quis irure aliquip exercitation laborum deserunt cillum eu. Laborum non minim duis laborum eu sunt ullamco est labore consequat. Nostrud ut cillum deserunt incididunt eiusmod et. Pariatur aliqua enim culpa dolor est nostrud deserunt ut cupidatat.`,
  },
];

const Reviews = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <>
            People have had fantastic experiences using Coffee Space.
            <br />
            Here’s what they have to say.
          </>
        }
        titleProps={{
          variant: 'h4',
          className: classes.fontWeight900,
        }}
        align='left'
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {reviewGroup1.map((review, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText
                      primary={review.name}
                      secondary={review.date}
                    />
                  </ListItem>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText primary={review.feedback} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {reviewGroup2.map((review, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText
                      primary={review.name}
                      secondary={review.date}
                    />
                  </ListItem>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText primary={review.feedback} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {reviewGroup3.map((review, index) => (
            <Card key={index} className={classes.card}>
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText
                      primary={review.name}
                      secondary={review.date}
                    />
                  </ListItem>
                  <ListItem disableGutters className={classes.disablePadding}>
                    <ListItemText primary={review.feedback} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

Reviews.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Reviews;
