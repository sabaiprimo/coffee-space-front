import React from 'react';
import PropTypes from 'prop-types';
import { Grid, colors, makeStyles } from '@material-ui/core';
import { SectionHeader, IconAlternate } from 'components/molecules';
import { CardBase, DescriptionListIcon } from 'components/organisms';

const useStyles = makeStyles(() => ({
  fontWeight900: {
    fontWeight: 900,
  },
}));

const data = [
  {
    icon: 'fas fa-cubes',
    color: 'rgb(177,150,141)',
    title: 'Is Coffee Good for You?',
    subtitle:
      'Yes! But it depends on the kind of coffee and the quantity. We’ve come a long way from the cans of Folgers that filled our grandparents’ cupboards, with our oat milk lattes, cold brews and Frappuccinos. Some of us are still very utilitarian about the drink while others perform elaborate rituals...',
  },
  {
    icon: 'fas fa-palette',
    color: 'rgb(177,150,141)',
    title: 'Health benefits and risks of drinking coffee',
    subtitle:
      'When people think of coffee, they usually think of its ability to provide an energy boost. However, according to some research, it can also offer some other important health benefits, such as a lower risk of liver cancer...',
  },
  {
    icon: 'fas fa-code',
    color: 'rgb(177,150,141)',
    title: 'Interesting coffee facts',
    subtitle:
      'The aroma of coffee contains more than 700 substances, and it is rich in caffeine. The original home of coffee…',
  },
  {
    icon: 'fas fa-moon',
    color: 'rgb(177,150,141)',
    title: 'Coffee from Nicaragua',
    subtitle:
      'Only Arabica coffee is grown in Nicaragua. The production area occupying more than 100 thousand hectares takes place primarily in…',
  },
  {
    icon: 'fas fa-rocket',
    color: 'rgb(177,150,141)',
    title: 'Two Famous Coffee Museums',
    subtitle:
      'We will discuss two interesting coffee museums on two different continents. The first will be a museum of one of the great powers of coffee, Brazil. The other, also a prestigious museum, is in Austria...',
  },
  {
    icon: 'fas fa-hand-holding-heart',
    color: 'rgb(177,150,141)',
    title: 'Coffee’s Influence on the Different Art Forms',
    subtitle:
      'Can a drink be synonymous with aesthetics? The question may seem a little bit strange. Taking some artistic forms, coffee…',
  },
];

const Features = ({ className, ...rest }) => {
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
        {data.map((adv, index) => (
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
            <CardBase
              liftUp
              variant='outlined'
              style={{ borderTop: `5px solid ${adv.color}` }}
            >
              <DescriptionListIcon
                icon={
                  <IconAlternate
                    fontIconClass={adv.icon}
                    color={adv.color}
                    shape='circle'
                    size='small'
                  />
                }
                title={adv.title}
                subtitle={adv.subtitle}
                align='left'
              />
            </CardBase>
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
