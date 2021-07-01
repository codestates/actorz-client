import Googlelogout from 'react-google-login';

const GooglelogoutBtn = () => {
  const gapi = require('gapi');
  const logout = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  const responseGoogle = (res) => {
    console.log(res);
  }
  return (
    <Googlelogout 
      clientId={process.env.REACT_APP_Google}
      buttonText='Logout' 
      onFailure={responseGoogle}  
      onLogoutSuccess={responseGoogle}
      cookiePolicy={'single_host_origin'}  
    />
  );
}

export default GooglelogoutBtn;