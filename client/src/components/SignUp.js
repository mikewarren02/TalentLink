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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import states from '../utils/states.json'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'




 function SignUp(props) {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({});
  
  
  const setBand = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.checked
    })
}

    const newUser = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
           
        })
    }

    const  setNewValue = (e) =>{
        setCredentials({
            ...credentials,
            state: e.target.value
        })
     
      }

    const registerUser = () => {
      props.onRegister(credentials)
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} styles={{background: 'blue'}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                onChange={newUser}
                label="Username"
                name="name"
                autoComplete="userName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={newUser}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="talent"
                name="talent"
                variant="outlined"
                required
                onChange={newUser}
                fullWidth
                id="talent"
                label="Talent"
                helperText="Instrument or genre type."
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            
              <TextField
                id="outlined-select-state"
                select
                label="State"
                value={ credentials.state }
                defaultValue={'State'}
                onChange={setNewValue}
               
                variant="outlined"
                        >
                {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
        </TextField>
            
          
    
            </Grid>
          
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name='isBand' onChange={setBand}  color="primary" />}
                label="Im a Band looking to recruit Musicians."
              />
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={registerUser}
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to='login'>
              <Link variant="body2">
                Already have an account? Sign in
              </Link>
              </NavLink>
            </Grid>
          </Grid>
      
      </div>
      <Box mt={5}>
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (credentials) => dispatch(actionCreators.register(credentials)),
        
    }
}


export default connect(null, mapDispatchToProps)(SignUp)