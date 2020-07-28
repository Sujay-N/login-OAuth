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
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     
    ],
    callbacks:{
      signInSuccess:() => false
    } 
  }


  componentDidMount=()=>{

   
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isLoggedIn:!!user})
      console.log("user",user)

      console.log(user.email)
      let userEmail = user.email;
      // window.parent.document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify(
      //   {
      //       event_code: 'ym-client-event', data: JSON.stringify({
      //           event: {
      //               code: "data",
      //               data: {
      //                   file_data: userEmail
      //               }
      //           }
      //       })
      //   }), '*');

      window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "data",
                data: {
                    email : userEmail
                }
            }
        })
    }), '*');

     
    })
  }



  

  render(){
    

  
  return (
    <div >

        {this.state.isLoggedIn ? (
          <div className="overflow-auto">
       
          <div className="d-flex justify-content-center"> 
          <h5 className="mt-2 text-primary"> Welcome, {firebase.auth().currentUser.displayName}</h5>
          </div>

          <div className="d-flex justify-content-center"> 
          <img className="mt-5 rounded rounded-circle" src={firebase.auth().currentUser.photoURL}  alt="DP" style={{width:"200px"}} />
          </div>

          <div className="d-flex justify-content-center"> 
          <p className="text-secondary mt-3"> {firebase.auth().currentUser.email} </p>
          </div>

          <div className="d-flex justify-content-center"> 
          <button className="btn btn-lg my-5 btn-outline-info" onClick={()=>firebase.auth().signOut() } >Sign Out</button>
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
