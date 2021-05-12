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
import SpaIcon from '@material-ui/icons/Spa';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ContactsIcon from '@material-ui/icons/Contacts';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { getPlants } from '../http/PlantDataLoader';
import { PlantsContext } from './PlantsContext';
import { useHistory } from 'react-router';
import { useAuth } from '../http/Auth/auth-context';
import { Session } from '../Models/User/Session';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@material-ui/core';

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
      cursor: 'pointer',
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 2,
      color: '#fff',
    },
  }),
);

const MyNavbar = (props: { sendSearchResult?: (plants: Plant[] | undefined, search: string) => void; }) => {
  const classes = useStyles();
  const plantContent = useContext(PlantsContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState<Plant[]>();

  const history = useHistory();
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerState, setDrawerState] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDatasheet = () => {
    handleMenuClose();
    history.push(`/datasheet/${auth.user?.username}`);
  }

  const handleLogout = () => {
    setAnchorEl(null);
    auth.logout();
    history.replace("/");
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent,) => {
    if (
      !auth.loggedIn ||
      (event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift'))) {
      return;
    }
    setDrawerState(open);
  };

  const handleClickMyPlants = (_path: string) => {
    if (!auth.loggedIn) return;
    let path = "/" + _path;
    history.push(path);
  }

  //Searching
  const searchPlants = async (plantName: string) => {
    setLoading(true);
    if (search === '') return;
    const _plants = await getPlants(plantName);
    if (_plants) {
      plantContent?.setPlants(_plants);
      setPlants(_plants);
    }
    await handleSearch();
    setLoading(false);
  }

  const handleSearch = async () => {
    console.log(plantContent?.plants);
    if (props.sendSearchResult)
      props.sendSearchResult(plants, search);
    setSearch("");
  }

  const StartSearch = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      await searchPlants(search);
    }
  }

  useEffect(() => {
    let session = auth.session;
    if (session === undefined) {
      session = JSON.parse(localStorage.getItem("session")!) as Session;
    }
    auth.setSession(session);
    if (session) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
    }
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
      <MenuItem onClick={handleDatasheet}>Profile</MenuItem>
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
        <ListItem button onClick={() => handleClickMyPlants("plants")}>
          <ListItemIcon>
            <SpaIcon />
          </ListItemIcon>
          <ListItemText primary={"My plants"} />
        </ListItem>
        <ListItem button onClick={() => handleClickMyPlants("friends")}>
          <ListItemIcon><ContactsIcon /></ListItemIcon>
          <ListItemText primary={"Friends"} />
        </ListItem>
        <ListItem button onClick={() => handleClickMyPlants("issues")}>
          <ListItemIcon><ReportProblemIcon /></ListItemIcon>
          <ListItemText primary={"Issues"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.grow}>
      { loading &&
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
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
          <Typography className={classes.title} variant="h6" noWrap onClick={() => {
            history.push("/");
          }} >
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
              value={search}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearch(event.target.value)}
              onKeyUp={(event) => StartSearch(event)}
            />
          </div>
          <div className={classes.grow} />
          {auth.loggedIn !== false ?
            <>
              <Typography variant="h6" noWrap>
                {auth.user && auth.user.username}
              </Typography>
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
            </>
            : <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

export default MyNavbar;
