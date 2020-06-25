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

export default function Contacts() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const tokens = useSelector(state => state.login.token);
  const [modalShow, setModal] = useState(false);
  const pictures = useSelector(state => state.session.profilePic);
  const versions = useSelector(state => state.session.profileVersion);
  const [token, setToken] = useState("");
  const [picture, setPicture] = useState("");
  const [picVersion, setPicVersion] = useState("");
  const [contactList, setcontactList] = useState([ ]);


  const dispatch = useDispatch();

  useEffect(() => {
    setToken(tokens);
    setPicture(pictures);
    setPicVersion(versions);
  },[tokens, pictures, versions]);

  useEffect(() => {
    setModal(true);
    axios.get(en.url + '/user/get_contacts', en.authentication)
    .then((res) => {
      setModal(false);
      if (res.status === 200) {
          setcontactList(res.data);
      } else {
          history.push("/");
      }
    })
    .catch(function(error){
      setModal(false);
      alert("Something went wrong");
      console.log(error);
    });
  },[token]);


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

  const chatBegins = (contact) => {
    console.log(contact);
    dispatch(SetChat(contact.username, contact.email, contact.profilepic, contact.profilepicversion));
  }


  return (
    <div className = "contacts-body">
        {modalShow && <div className="spinner-body">
            <div className="spinner-border text-success" role="status"></div>
        </div>}
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <CloudinaryContext cloudName="profilechatify">
                <Image publicId={picture} version={picVersion} />
            </CloudinaryContext> &nbsp;
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
        <div className="contact-list">
            {contactList.map((contact) => {
                return(
                <div className="contact" key={contact.email}>
                  <div className = "row">
                    <div className = "col-sm-2">
                      <CloudinaryContext cloudName="profilechatify">
                          <Image publicId={contact.profilepic} version={contact.profilepicversion} />
                      </CloudinaryContext>
                    </div>
                    <div className = "col-sm-10 no-gutter">
                      <p className = "contact-name" onClick ={() => chatBegins(contact)}>{contact.username}</p>
                    </div>
                  </div>
                </div>
                )
            })}
        </div>
    </div>
  );
}