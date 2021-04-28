import React, { useContext, useEffect, useState } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Plant from '../Models/Plant/Plant';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import clsx from 'clsx';

import { getPlants } from '../http/PlantDataLoader';
import { PlantsContext } from './PlantsContext';
import { ErrorModel } from "../Models/common/ErrorModel";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      height: '100%',
      position: 'relative',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    sectionDesktop: {
      display: 'felx',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    list: {
      width: drawerWidth,
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }),
);

const MyNavbar = (props: { sendSearchResult?: (plants: Plant[] | undefined, search: string) => void; }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.removeItem("token");
    setIsLogin(false);
  }

  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent,) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
    console.log("Drawer: " + open);
  };

  //Searching
  const searchPlants = async (plantName: string) => {
    const plants = await getPlants(plantName);
    if (plants) {
      const filtered = plants.filter(plant =>
        plant.description !== null && plant.description.length > 10 && plant.thumbnail_url.startsWith("http")
      )
      console.log(plants);
      console.log(filtered);
      plantContent?._setPlants(filtered)
    } else {
      plantContent?._setPlants([]);
    }
    handleSearch();
  }

  const handleSearch = () => {
    const plants = plantContent?._plants;
    if (props.sendSearchResult)
      props.sendSearchResult(plants, search);
  }

  const StartSearch = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      searchPlants(search);
      e.currentTarget.value = "";
    }
  }

  const [search, setSearch] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const plantContent = useContext(PlantsContext);

  //const UserConent = useContext(UserContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) setIsLogin(true);
  }, [])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout} >Logout</MenuItem>
    </Menu>
  );

  const list = () => (
    <div
      className={`${classes.list} ${classes.fullList}`}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <React.Fragment>
            <Drawer
              anchor="left"
              open={drawerState}
              onClose={toggleDrawer(false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {list()}
            </Drawer>
          </React.Fragment>
          <Typography className={classes.title} variant="h6" noWrap>
            MyGarden App
          </Typography>
          <div className={classes.search}>
            <IconButton
              edge="end"
              color="inherit"
              size="small"
              onClick={() => {
                searchPlants(search)
              }
              }>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </IconButton>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearch(event.target.value)}
              onKeyUp={(event) => StartSearch(event)}
            />
          </div>
          <div className={classes.grow} />
          {isLogin !== false ?
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            : <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default MyNavbar;
