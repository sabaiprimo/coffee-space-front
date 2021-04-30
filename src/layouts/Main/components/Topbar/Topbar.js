import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  Popover,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Image, DarkModeToggler } from 'components/atoms';
import coffIcon from '../../../../../src/assets/icons/coffee-space-icons.svg';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../features/user/UserSlice';

const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    marginLeft: theme.spacing(2),
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 140,
      height: 55,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
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
}));

const Topbar = ({
  themeMode,
  themeToggler,
  onSidebarOpen,
  pages,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };
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
        {item.map((page, i) => (
          <ListItem disableGutters key={i} className={classes.menuGroupItem}>
            <Typography
              variant='body1'
              component={'a'}
              href={page.href}
              className={clsx(classes.navLink, 'submenu-item')}
              color='textSecondary'
              onClick={handleClose}
            >
              {page.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  const RecipePages = () => {
    const { pages } = recipes;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages} />
        </div>
      </div>
    );
  };

  const ArticlePages = () => {
    const { pages } = articles;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages} />
        </div>
      </div>
    );
  };

  const AccountPages = () => {
    const { pages } = account;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={pages} />
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

  const renderPages = (id) => {
    if (id === 'recipe-pages') {
      return <RecipePages />;
    }
    if (id === 'article-pages') {
      return <ArticlePages />;
    }
    if (id === 'account') {
      return <AccountPages />;
    }
  };

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href='/' title='coffee-space'>
          <Image
            className={classes.logoImage}
            src={themeMode === 'light' ? coffIcon : coffIcon}
            alt='coffee-space'
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List disablePadding className={classes.navigationContainer}>
          {[recipes, articles, account].map((page, i) =>
            page.expand ? (
              <div key={page.id}>
                <ListItem
                  aria-describedby={page.id}
                  onClick={(e) => handleClick(e, page.id)}
                  className={clsx(
                    classes.listItem,
                    openedPopoverId === page.id ? classes.listItemActive : ''
                  )}
                >
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    className={clsx(classes.listItemText, 'menu-item')}
                  >
                    {page.title}
                  </Typography>
                  <ListItemIcon className={classes.listItemIcon}>
                    <ExpandMoreIcon
                      className={
                        openedPopoverId === page.id ? classes.expandOpen : ''
                      }
                      fontSize='small'
                    />
                  </ListItemIcon>
                </ListItem>
                <Popover
                  elevation={1}
                  id={page.id}
                  open={openedPopoverId === page.id}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  classes={{ paper: classes.popover }}
                >
                  <div>{renderPages(page.id)}</div>
                </Popover>
              </div>
            ) : page.norender ? (
              ''
            ) : (
              <div key={page.id}>
                <ListItem
                  aria-describedby={page.id}
                  href={page.href}
                  className={clsx(
                    classes.listItem
                    // openedPopoverId === page.id ? classes.listItemActive : ''
                  )}
                >
                  <a href={page.href}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      className={clsx(classes.listItemText, 'menu-item')}
                    >
                      {page.title}
                    </Typography>
                  </a>
                </ListItem>
              </div>
            )
          )}
          {displayName ? (
            <>
              <Typography>Hello! {displayName}</Typography>

              <ListItem
                className={clsx(classes.listItem, 'menu-item--no-dropdown')}
              >
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
            </>
          ) : (
            <>
              <ListItem
                className={clsx(classes.listItem, 'menu-item--no-dropdown')}
              >
                <Button
                  variant='contained'
                  component='a'
                  target='blank'
                  href='/signin'
                  className={classes.listItemButton}
                >
                  LOG IN
                </Button>
              </ListItem>
              <ListItem
                className={clsx(classes.listItem, 'menu-item--no-dropdown')}
              >
                <Button
                  variant='contained'
                  color='primary'
                  component='a'
                  target='blank'
                  href='/signup'
                  className={classes.listItemButton}
                >
                  REGISTER NOW
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Hidden>
      <Hidden mdUp>
        {/* <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} /> */}
        <IconButton
          className={classes.iconButton}
          onClick={onSidebarOpen}
          aria-label='Menu'
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object.isRequired,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default Topbar;
