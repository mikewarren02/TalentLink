import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthenticationHeader } from '../utils/authenticate'
import { useState } from 'react'
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';





function SignIn(props) {

    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        fetch('http://localhost:3030/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            if(result.success) {
                console.log('login successs')
                const token = result.token 
                const id = result.id
                const name = result.name
                const isBand = result.isBand
               
                console.log(result)
                // get the token and put it in local storage 
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("id", id)
                localStorage.setItem('name', name)
                localStorage.setItem('isBand', isBand)

                // set the authentication header 
                setAuthenticationHeader(token)
                // dispatch to redux 
                props.onLogin(token) 
                props.isBand(isBand)
                props.userId(id)
                // console.log(userType)
                
                // take the user to the dashboard screen 
                props.history.push('/')
            } else {
                props.history.push('/login')
                console.log('login failure')
                console.log(credentials)
            }
        })
    }



  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            onChange = {handleChange}
            label="Username"
            name="name"
            autoComplete="Username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange = {handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            onClick = {handleLogin}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
          <Grid container  >


            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
             
            </Grid>

            
            
          </Grid>
        </div>
          <Button
            variant='outlined'
            type="submit"
            
            color="primary"
           
            className={classes.submit}
          >
            Demo
          </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          TalentLink
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token}),
        isBand: (value) => dispatch({type: 'IS_BAND', payload: value}),
        userId: (id) => dispatch({type: 'USER_ID', payload: id})


    }
}


export default connect(null, mapDispatchToProps)(SignIn)