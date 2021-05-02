import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Button } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { CardBase } from 'components/organisms';
import { gql, useMutation } from '@apollo/client';

const EMAIL_SUBSCRIPTION = gql`
  mutation subscribeEmail($email: String) {
    addSubscribe(email: $email)
  }
`;

const Subscription = (props) => {
  const { className, ...rest } = props;
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
      <CardBase withShadow data-aos='fade-up'>
        <SectionHeader
          title='Subscribe To Our Newsletter'
          subtitle="Don't lose a chance to be among the firsts to know about our upcoming news and updates."
          fadeUp
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12} sm={9}>
              <TextField
                size='small'
                fullWidth
                label='Email'
                variant='outlined'
                type='email'
                required
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                type='submit'
              >
                subscribe
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardBase>
    </div>
  );
};

Subscription.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Subscription;
