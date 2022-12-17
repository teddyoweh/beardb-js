const ssl = require('ssl');
const request = require('request');
const json = require('json');
const axios = require('axios');
const http = require('http');

class Client {
  constructor(host, port, email, secret) {
    this.configData = {};
    this._config(host, port, email, secret);
    this._headers = {'Content-Type': 'application/json'};
    this.host = host;
    this.port = port;
  }

  _ishttps(host, port) {
    const context = ssl.createDefaultContext();
    try {
      const s = context.wrapSocket(socket.socket(), server_hostname=host);
      s.connect(host, port);
      return true;
    } catch (err) {
      return false;
    }
  }
  sendPostRequest(endpoint, body, headers) {
   
    const options = {
        method: 'POST',
        url: endpoint,
        headers: headers,
        body: body
    };
    fetch('http://'+endpoint,{
      method: 'POST',
      body: body

    })
     .then(response => {
      console.log(response)
        return response.body;
      })
   
    }
 

   _config(host, port, email, secret) {
    this.configData = {};
    this.host = host;
    this.port = port;
    this.configData['email'] = email;
    this.configData['secret'] = secret;
    this.routes;
  }

   _merge(...args) {
    const merged = this.configData;
    for (const dictionary of args) {
      for (const key in dictionary) {
        merged[key] = dictionary[key];
      }
    }
    return merged;
  }

  get address() {
    return this.host + ':' + this.port;
  }

  headers() {
    return this._headers;
  }

   _grab(data, url) {
 
    const header = this.headers()
    
    
 
    console.log(data)
   this.sendPostRequest(this.routes[url],data,header)
   
  }

  get routes() {
    const routes = {
      me: this.address + '/me',
      newuser: this.address + '/newuser',
      newproject: this.address + '/newproject',
      newdatabase: this.address + '/newdatabase',
      newbucket: this.address + '/newbucket',
      insertdata: this.address + '/insertdata',
      fetchdata: this.address + '/fetchdata',
      fetchbyid: this.address + '/fetchbyid',
      updatedata: this.address + '/updatedata',
      updatebyid: this.address + '/updatebyid',
      deletedata: this.address + '/deletedata',
      deletebyid: this.address + '/deletebyid',
      getbuckets: this.address + '/getbuckets',
      getdatabases: this.address + '/getdatabases',
      getprojects: this.address + '/getprojects',
    };
    return routes;
  }

  mydata() {
    const body = this._merge({});
    return this._grab(body, 'me');
  }

  createnewuser(fullname, email, password) {
    const body = this._merge({
      email: email,
      password: password,
      fullname: fullname,
    });
 
    return this._grab(body, 'newuser');
  }

  createnewproject(project) {
    const body = this._merge({project: project});
    return this._grab(body, 'newproject');
  }

  createnewdatabase(database, project) {
    const body = this._merge({database: database, project: project});
    return this._grab(body, 'newdatabase');
  }

  createnewbucket(bucket, database, project) {
    const body = this._merge({bucket: bucket, database: database, project: project});
    return this._grab(body, 'newbucket');
  }

  insertdata(data, bucket, database, project) {
    const body = this._merge({data: data, bucket: bucket, database: database, project: project});
    return this._grab(body, 'insertdata');
  }

  updatedata(query, data, bucket, database, project) {
    const body = this._merge({query: query, data: data, bucket: bucket, database: database, project: project});
    return this._grab(body, 'updatedata');
  }

  updatebyid(id, data, bucket, database, project) {
    const body = this._merge({id: id, data: data, bucket: bucket, database: database, project: project});
    return this._grab(body, 'updatebyid');
  }

  fetchdata(query, bucket, database, project) {
    const body = this._merge({query: query, bucket: bucket, database: database, project: project});
    return this._grab(body, 'fetchdata');
  }

  fetchdatabyid(id, bucket, database, project) {
    const body = this._merge({id: id, bucket: bucket, database: database, project: project});
    return this._grab(body, 'fetchdatabyid');
  }

  deletedata(data, bucket, database, project) {
    const body = this._merge({data: data, bucket: bucket, database: database, project: project});
    return this._grab(body, 'deletedata');
  }

  deletebyid(id, bucket, database, project) {
    const body = this._merge({id: id, bucket: bucket, database: database, project: project});
    return this._grab(body, 'deletebyid');
  }

  getbuckets() {
    const body = this._merge({});
    return this._grab(body, 'getbuckets');
  }

  getdatabases() {
    const body = this._merge({});
    return this._grab(body, 'getdatabases');
  }

  getprojects() {
    const body = this._merge({});
    return this._grab(body, 'getprojects');
  }
}


module.exports = {
  Client: Client,
};