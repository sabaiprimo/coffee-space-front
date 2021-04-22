import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  colors,
  Avatar,
  NoSsr,
} from '@material-ui/core';
import clsx from 'clsx';
import { Image, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
// import { CardProduct } from 'components/organisms';
// import { Image } from 'components/atoms';
import { DescriptionCta } from 'components/molecules';
import { CardProduct } from 'components/organisms';
import icon1 from '../../../../assets/icons/coffee-recipe-gen/hourglass.svg';
import icon2 from '../../../../assets/icons/coffee-recipe-gen/stopwatch.svg';
import icon3 from '../../../../assets/icons/coffee-recipe-gen/hot-cup.svg';
import icon4 from '../../../../assets/icons/coffee-recipe-gen/cooking.svg';
import icon5 from '../../../../assets/icons/coffee-recipe-gen/sack.svg';

const useStyles = makeStyles((theme) => ({
  cardProduct: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    '& .card-product__content': {
      padding: theme.spacing(2),
    },
    '& .card-product__media': {
      minHeight: 300,
    },
  },
  image: {
    objectFit: 'cover',
  },
  blogTitle: {
    fontWeight: 700,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    fontWeight: 700,
    margin: theme.spacing(0, 1, 1, 0),
  },
  author: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 'bold',
  },
  descriptionCta: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
}));

const SimilarStories = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const BlogMediaContent = (props) => (
    <Image
      {...props}
      className={classes.image}
      lazyProps={{ width: '100%', height: '100%' }}
    />
  );

  const BlogContent = (props) => (
    <div>
      <div className={classes.tags}>
        {props.tags.map((item, index) => (
          <Typography
            variant='overline'
            color='primary'
            className={classes.tag}
            key={index}
          >
            {item}
          </Typography>
        ))}
      </div>
      <Typography
        variant='h6'
        color='textPrimary'
        className={classes.blogTitle}
        align='center'
      >
        {props.title}
      </Typography>
      <Typography
        variant='body2'
        color='textPrimary'
        className={classes.author}
        align='center'
      >
        <i>
          {props.author.name} - {props.date}
        </i>
      </Typography>
    </div>
  );

  return (
    <div className={className} {...rest}>
      <DescriptionCta
        title='Similar Recipes'
        primaryCta={
          <Button variant='outlined' color='primary' size='large'>
            View all
          </Button>
        }
        align={'left'}
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
          className: classes.title,
        }}
        className={classes.descriptionCta}
        data-aos='fade-up'
      />
      <Grid container spacing={2}>
        {data.map((item, index) =>
          index < 3 ? (
            <Grid item xs={12} sm={12} md={4} key={index} data-aos='fade-up'>
              <CardProduct
                className={classes.cardProduct}
                withShadow
                liftUp
                mediaContent={
                  <>
                    <Image
                      {...item.image}
                      alt={item.title}
                      lazyProps={{ width: '100%', height: '100%' }}
                      className={classes.image}
                    />
                  </>
                }
                cardContent={
                  <Grid container spacing={1}>
                    <div
                      style={{
                        color: 'black',
                        // backgroundColor: 'DodgerBlue',
                        padding: '10px',
                        fontFamily: 'Arial',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <img
                        style={{
                          maxWidth: '8%',
                        }}
                        src={icon1}
                        alt='Facebook'
                      />
                      <p className={classes.generalInfo}>15 mins</p>

                      <img
                        style={{
                          maxWidth: '8%',
                        }}
                        src={icon2}
                        alt='Facebook'
                      />
                      <p className={classes.generalInfo}>30 mins</p>

                      <img
                        style={{
                          maxWidth: '8%',
                        }}
                        src={icon3}
                        alt='Facebook'
                      />
                      <p className={classes.generalInfo}>1 cup</p>

                      <img
                        style={{
                          maxWidth: '8%',
                        }}
                        src={icon4}
                        alt='Facebook'
                      />
                      <p className={classes.generalInfo}>Beginner</p>

                      <img
                        style={{
                          maxWidth: '8%',
                        }}
                        src={icon5}
                        alt='Facebook'
                      />
                      <p className={classes.generalInfo}>Light Roast</p>
                    </div>

                    <Grid item xs={12}>
                      <Typography
                        variant='h6'
                        color='textPrimary'
                        align='left'
                        className={classes.fontWeight700}
                      >
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        color='textSecondary'
                        align='left'
                      >
                        {item.address}
                      </Typography>
                    </Grid>
                    <Grid item container justify='space-between' xs={12}>
                      <Grid item container xs={6} wrap='nowrap'>
                        {item.reviews.map((review, index) =>
                          index < 3 ? (
                            <Avatar
                              key={index}
                              className={classes.courseCardReviewAvatar}
                              alt={review.authorName}
                              {...review.authorPhoto}
                            />
                          ) : (
                            ''
                          )
                        )}
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify='flex-end'
                        xs={6}
                      >
                        <NoSsr>
                          <i
                            className={clsx(
                              'fas fa-star',
                              classes.courseCardReviewStar
                            )}
                          />
                        </NoSsr>
                        <Typography
                          component='span'
                          variant='body1'
                          className={classes.fontWeight700}
                        >
                          {item.score}
                        </Typography>
                        <Typography
                          noWrap
                          component='span'
                          variant='body2'
                          color='textSecondary'
                          className={classes.reviewCount}
                        >
                          ({item.reviewCount} reviews)
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <LearnMoreLink
                        href='/single-recipe'
                        title='Learn more'
                        variant='body1'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
          ) : (
            ''
          )
        )}
      </Grid>
    </div>
  );
};

SimilarStories.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default SimilarStories;
