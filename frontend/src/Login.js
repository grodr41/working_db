import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
var apiBaseUrl = "http://localhost:4000/api/";
import axios from 'axios';
import UploadPage from './UploadPage';
import {deepPurple400, red500, grey400, indigo600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
         <TextField
           hintText="Enter your User ID"
           floatingLabelText="User ID"
           onChange = {(event,newValue)=>this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'userID'
    }
  }

  componentWillMount(){
  // console.log("willmount prop values",this.props);
      console.log("in user componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
           <TextField
             hintText="Enter User ID"
             floatingLabelText="User ID"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
    
  }
  handleClick(event){
    var self = this;
    var payload={
      "userid":this.state.username,
      "password":this.state.password,
      "role":this.state.loginRole
    }
    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("Login successfull");
       var uploadScreen=[];
       uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
       self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.data.code == 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar 
            title="Welcome to Crypto Tracker"
            showMenuIconButton={false}
          />    
        </MuiThemeProvider>

        {this.state.loginComponent}
      </div>
    );
  }
}

const muiTheme = getMuiTheme({
  palette: {
     primary1Color: indigo600,
  },
  appBar: {
    height: 50,
  },
});

const style = {
  margin: 15,
   appBar: {
        flexWrap: 'wrap'
      },
      tabs: {
        width: '100%'
      }
};

export default Login;

