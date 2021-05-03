/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  Divider,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../../features/user/UserSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
  divider: {
    width: '100%',
  },
}));

const SidebarNav = (props) => {
  const { pages, onClose, className, ...rest } = props;
  const classes = useStyles();

  const { displayName } = useSelector(userSelector);

  const recipes = displayName
    ? pages.recipes
    : {
        title: 'Browse Recipe',
        id: 'browse-recipe-page',
        href: '/browse-recipe',
      };
  const articles = displayName
    ? pages.articles
    : {
        title: 'Explore Articles',
        id: 'explore-article-page',
        href: '/blog-articles',
      };
  const account = displayName
    ? pages.account
    : {
        norender: true,
      };

  const MenuGroup = (props) => {
    const { item } = props;

    return (
      <List disablePadding>
        <ListItem disableGutters>
          <Typography
            variant='body2'
            color='primary'
            className={classes.menuGroupTitle}
          >
            {/* {item.groupTitle} */}
          </Typography>
        </ListItem>
        {item.length > 0 ? (
          item.map((page, i) => (
            <ListItem disableGutters key={i} className={classes.menuGroupItem}>
              <Typography
                variant='body2'
                component={'a'}
                href={page.href}
                className={clsx(classes.navLink, 'submenu-item')}
                color='textPrimary'
                onClick={() => onClose()}
              >
                {page.title}
              </Typography>
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters className={classes.menuGroupItem}>
            <Typography
              variant='body2'
              component={'a'}
              href={item.href}
              className={clsx(classes.navLink, 'submenu-item')}
              color='textPrimary'
              onClick={() => onClose()}
            >
              {item.title}
            </Typography>
          </ListItem>
        )}
      </List>
    );
  };

  const RecipePages = () => {
    const { pages } = recipes;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages ? pages : recipes} />
        </div>
      </div>
    );
  };

  const ArticlePages = () => {
    const { pages } = articles;

    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages ? pages : articles} />
        </div>
      </div>
    );
  };

  const AccountPages = () => {
    const { pages } = account;

    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages ? pages : account} />
        </div>
      </div>
    );
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    alert('User has logged out');
    window.location.replace('/');
  };
  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={() => onClose()}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize='small' />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant='h6' color='textPrimary' gutterBottom>
          Recipes
        </Typography>
        <RecipePages />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant='h6' color='textPrimary' gutterBottom>
          Articles
        </Typography>
        <ArticlePages />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      {account.expand ? (
        <ListItem className={classes.listItem}>
          <Typography variant='h6' color='textPrimary' gutterBottom>
            Account
          </Typography>
          <AccountPages />
        </ListItem>
      ) : (
        ''
      )}
      {!displayName ? (
        <>
          {' '}
          <ListItem className={classes.listItem}>
            <Button variant='outlined' fullWidth component='a' href='/signin'>
              Log in
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              component='a'
              href='/signup'
            >
              Sign up
            </Button>
          </ListItem>
        </>
      ) : (
        <ListItem className={classes.listItem}>
          <Button
            variant='contained'
            component='a'
            target='blank'
            onClick={handleLogout}
            className={classes.listItemButton}
          >
            LOG OUT
          </Button>
        </ListItem>
      )}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
