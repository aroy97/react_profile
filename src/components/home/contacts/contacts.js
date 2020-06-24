import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './contacts.scss'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import history from '../../../history';
import { SetToken, SetSession } from '../../../actions/login';
import axios from 'axios';
import en from '../../../environment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Contacts() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const tokens = useSelector(state => state.login.token);
  const [token, setToken] = useState(tokens);
  const [modal, setModal] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    if (token === '' || token === null || token === undefined) {
        if (localStorage.getItem('sessionToken') === '' || localStorage.getItem('sessionToken') === null ||localStorage.getItem('sessionToken') === undefined) {   
            history.push("/");
        } else {
            setToken(localStorage.getItem('sessionToken'));
            dispatch(SetToken(localStorage.getItem('sessionToken')));
            getPicture();
        }
    }
  }, [token, dispatch]);

  const getPicture = () => {
    let payload = {
        "token": token
    }
    setModal(true);
    axios.post(en.url + '/user/get_session', payload, en.authentication)
    .then((res) => {
        setModal(false)
        if (res.status === 200) {
            dispatch(SetSession(res.data));
        } else {
            history.push('/');
        }
    })
    .catch(function(error){
        alert("Something went wrong");
        console.log(error);
    });
};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogouthandleClose = () => {
    setAnchorEl(null);
    localStorage.setItem('sessionToken', '');
    history.push("/");
  };

  const profileHandleClose = () => {
    setAnchorEl(null);
    history.push('/profile')
  }


  return (
    <div className = "contacts-body">
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            Pic &nbsp;
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={profileHandleClose}>Profile</MenuItem>
            <MenuItem onClick={LogouthandleClose}>Logout</MenuItem>
        </Menu>
            </Toolbar>
        </AppBar>
        </div>
        {/* <button onClick = {() => dispatch(SetToken())}>Click</button> */}
    </div>
  );
}