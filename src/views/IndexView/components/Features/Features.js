import React from 'react';
import PropTypes from 'prop-types';
import { Grid, colors, makeStyles } from '@material-ui/core';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { CardBase, DescriptionListIcon } from 'components/organisms';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const checkTag = (tags) => {
  if (tags.includes('caffeine') || tags.includes('danger')) {
    return 'fas fa-exclamation-triangle';
  } else if (tags.includes('store') || tags.includes('business')) {
    return 'fas fa-store';
  } else if (tags.includes('health')) {
    return 'fas fa-briefcase-medical';
  } else if (tags.includes('fact')) {
    return 'fas fa-info-circle';
  } else if (tags.includes('money')) {
    return 'fas fa-dollar-sign';
  }
  return 'fas fa-coffee';
};

const Features = ({ data, className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <SectionHeader
        title='Read some coffee articles from expert!'
        fadeUp
        titleProps={{
          variant: 'h3',
          color: 'textPrimary',
          className: classes.fontWeight900,
        }}
      />
      <Grid container spacing={2}>
        {data.map((article, index) => (
          <Grid
            key={index}
            item
            container
            alignItems='center'
            direction='column'
            xs={6}
            md={4}
            data-aos='fade-up'
          >
            <Link to={'/single-article/' + article._id}>
              <CardBase
                liftUp
                variant='outlined'
                style={{ borderTop: `5px solid ${colors.brown}` }}
              >
                <DescriptionListIcon
                  icon={
                    <IconAlternate
                      fontIconClass={checkTag(article.tags)}
                      color={colors.brown}
                      shape='circle'
                      size='small'
                    />
                  }
                  title={article.title}
                  subtitle={article.subtitle}
                  align='left'
                />
              </CardBase>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Features.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Features;
