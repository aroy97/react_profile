import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './chat.scss'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import history from '../../../history';
import {Image, CloudinaryContext} from 'cloudinary-react';
import { SetChat } from '../../../actions/chat';
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

export default function Chat() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const tokens = useSelector(state => state.login.token);
  const [modal, setModal] = useState(false);
  const pictures = useSelector(state => state.chat.picture);
  const versions = useSelector(state => state.chat.pictureversion);
  const names = useSelector(state => state.chat.name);
  const [token, setToken] = useState("");
  const [picture, setPicture] = useState("");
  const [picVersion, setPicVersion] = useState("");
  const [name, setName] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
      console.log(tokens, pictures, versions, names);
    setToken(tokens);
    setPicture(pictures);
    setPicVersion(versions);
    setName(names);
  },[tokens, pictures, versions, names]);


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
    <div className = "chat-body">
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            {picture && <CloudinaryContext cloudName="profilechatify">
                <Image publicId={picture} version={picVersion} />
            </CloudinaryContext>} &nbsp;
            <Typography variant="h6" className={classes.title}>
                {name}
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