require("dotenv").config()

let redirectUri;

if(process.env.NODE_ENV === "production"){
  redirectUri = process.env.REACT_APP_REDIRECT_URI;
}else{
  redirectUri = process.env.REACT_APP_REDIRECT_URI_TEST;
}
module.exports = {
  redirectUri,
};