import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
        if(authUser){
          // user has logged in
          console.log(authUser);
          setUser(authUser);

        } else{
          // user has logged out ....
          setUser(null);
        }
      })

      return () =>{
        // perform some cleanup actions
        unsubscribe();
      }
    }, [user, username]);

    // useEffect -> Runs a specific code based on a perticular condition
    useEffect(() =>{
      db.collection('posts').onSnapshot(snapshot =>{
        //anytime a new post is added, this code fires
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
      })
    },[posts]);

    const signUp =(event) =>{
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) =>{
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) =>alert(error.message));
    }

    const signIn = (event) =>{
      event.preventDefault();

      auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) =>alert(error.message))
      setOpenSignIn(false)
    }

  return (
    <div className="App">
        <Modal
        open={open}
        onClose={() => setOpen(false)}
         >
      <div style={modalStyle} className={classes.paper}>
        <form className='app__signUp'>
            <center>
            <img className='app__headerImage' 
              src='https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png'
              alt='' 
              />
            </center>

              <Input placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <Input placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signUp}>sign Up</Button>
        
        </form>
      </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
         >
      <div style={modalStyle} className={classes.paper}>
        <form className='app__signUp'>
            <center>
            <img className='app__headerImage' 
              src='https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png'
              alt='' 
              />
            </center>

              <Input placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <Input placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signIn}>sign In</Button>
        
        </form>
      </div>
      </Modal>
        
        <div className='app__header'>
          <img className='app__headerImage'
           src='https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png' 
           alt=''
          />
        </div>

        {user ? (
            <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
        

        {
          posts.map(({id, post}) =>(
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        } 
    </div>
  );
}

export default App;
