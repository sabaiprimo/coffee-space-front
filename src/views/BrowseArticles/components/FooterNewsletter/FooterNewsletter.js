import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  colors,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Icon, Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { gql, useMutation } from '@apollo/client';
const EMAIL_SUBSCRIPTION = gql`
  mutation subscribeEmail($email: String) {
    addSubscribe(email: $email)
  }
`;

const useStyles = makeStyles(() => ({
  textWhite: {
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControl: {
    maxWidth: 400,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInputAdornment-root i': {
      color: 'white !important',
    },
  },
  image: {
    maxWidth: 400,
  },
}));

const FooterNewsletter = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();
  const [emailForm, setEmailForm] = useState();
  const [subscribeEmail, subscribeResult] = useMutation(EMAIL_SUBSCRIPTION);
  const handleEmail = (e) => {
    e.persist();
    setEmailForm(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribeEmail({ variables: { email: emailForm } });
  };
  useEffect(() => {
    if (subscribeResult.data) {
      alert(subscribeResult.data.addSubscribe);
    }
    // console.log(loginResult);
  }, [subscribeResult.data]);
  return (
    <div className={className} {...rest}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} container>
          <Image
            src='https://assets.maccarianagency.com/the-front/illustrations/relax-in-sofa.svg'
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} sm={6} container alignItems='center'>
          <div>
            <SectionHeader
              title={
                <span className={classes.textWhite}>
                  Subscribe To Our Newsletter
                </span>
              }
              subtitle={
                <span className={classes.textWhite}>
                  Don't lose a chance to be among the firsts to know about our
                  upcoming news and updates.
                </span>
              }
              fadeUp
              align='left'
            />
            <form onSubmit={handleSubmit}>
              <div className={classes.inputContainer}>
                <FormControl
                  fullWidth
                  variant='outlined'
                  data-aos='fade-up'
                  className={classes.formControl}
                >
                  <OutlinedInput
                    onChange={handleEmail}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton type='submit'>
                          <Icon
                            fontIconClass='fas fa-paper-plane'
                            fontIconColor={colors.indigo[900]}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                    type='email'
                    required
                    placeholder='Enter your email'
                  />
                </FormControl>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

FooterNewsletter.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default FooterNewsletter;
