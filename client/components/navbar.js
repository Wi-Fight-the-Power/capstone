import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiPaper-root": {
      backgroundColor : "#6930C3"
    },
    "& .MuiListItem-root": {
      paddingTop:"20px",
      paddingBottom:"20px",
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Caveat',
    color: 'white',

  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: "blue"
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{backgroundColor : "#6930C3"}}>
        <Link to="/"  style={{ textDecoration: 'none'}}>
          <ListItem button style={{color : "white"}}>Home</ListItem>
        </Link>
        <Link to="/lobby"  style={{ textDecoration: 'none'}}>
          <ListItem button style={{color : "white"}}>Lobby</ListItem>
        </Link>
        <Link to="/aboutus"  style={{ textDecoration: 'none'}}>
          <ListItem button style={{color : "white"}}>About Us</ListItem>
        </Link>
        <Link to="/instructions"  style={{ textDecoration: 'none'}}>
          <ListItem button style={{color : "white"}}>Instructions</ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor : "#6930C3"}}>
        <Toolbar>
          <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer className={classes.root} anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
          <Link to="/"  style={{ textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.title}>
            SKETCHI
          </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}



