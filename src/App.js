import React,{Component} from 'react';

import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


firebase.initializeApp({
  apiKey:"AIzaSyBnjCBwl0uIDowfRvm2MYEC6TdwL2AHV1o",
  authDomain : "login-oauth-f124f.firebaseapp.com"
  })

class App extends Component {
  state={isLoggedIn: false}

  uiConfig={
    signInFlow:"popup",
    signInoptions:[
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     
    ],
    callbacks:{
      signInSuccess:() => false
    } 
  }


  componentDidMount=()=>{

   
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isLoggedIn:!!user})
      console.log("user",user)
    })
  }
  render(){

  
  return (
    <div >

        {this.state.isLoggedIn ? (
          <div>
          <div className=" mt-2 col-lg-4  offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 border rounded border-rounded shadow-lg ">
         

          <h2 className="text-center text-primary mt-5"> Welcome, {firebase.auth().currentUser.displayName}</h2>
          <img className="offset-3 rounded rounded-circle" src={firebase.auth().currentUser.photoURL}  alt="DP" style={{width:"200px"}} />
          <p className=" ml-2 text-center text-secondary mt-3"> {firebase.auth().currentUser.email} </p>

          <button className="btn btn-lg my-5 btn-outline-info offset-4" onClick={()=>firebase.auth().signOut() } >Sign Out/LogOut</button>
          </div>
          </div>
        ) : (
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()} />
        )}
    </div>
  );
}
}

export default App;
