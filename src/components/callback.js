import React, { Component } from 'react';
class callback extends Component {

setData(val)
{
     localStorage.setItem('accessToken',val.access_token);
    localStorage.setItem('refreshToken',val.refresh_token);
}

getAccessToken()
{
   // console.log('this is the local access token' + localStorage.getItem('accessToken'));
    return localStorage.getItem('accessToken');
}
getRefreshToken()
{
    console.log('this is the local refresh token' + localStorage.getItem('refreshToken'));
    return localStorage.getItem('refreshToken');
}
componentDidMount() 
{
    var my_code;
    const query= this.props.location.search;
   // console.log(query);
       var vars = query.split('&');
       for (var i = 0; i < vars.length; i++) {
           var pair = vars[i].split('=');
           if (decodeURIComponent(pair[0]) === '?code') {
              console.log(decodeURIComponent(pair[1]));
              my_code=decodeURIComponent(pair[1]);
           }
       }
  
       var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "{\"grant_type\": \"authorization_code\",\"code\":\""+my_code+"\",\"client_id\":\"826e992304e7df9a274d697ba5aef447\",\"client_secret\":\"cfedc4fff1982ed80fb4a5d6d406fa58\",\"redirect_uri\":\"http://localhost:3000/callback\"}";

var requestOptions = {
 method: 'POST',
 headers: myHeaders,
 body: raw,
 redirect: 'follow'
};

fetch("https://api.codechef.com/oauth/token", requestOptions)
 .then(response => response.json())
 .then(res=>res.result.data)
       .then(data => {
        this.setData(data);
        window.location.replace('http://localhost:3000/home');
       })
 .catch(error => console.log('error', error));  
}
    render() { 
        return <div/>;
    }
}
 
export default callback;