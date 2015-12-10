PROPERTY MANAGER
===============
This NODEJS based application provides a centralized way of managing your properties for multiple projects, releases, environments. Provides easy management of properties via using MONGODB as the persistent storage manager for all the properties. This application is being developed on top of NODEJS with Express as the framwork and provide a clean UI to manage all the releases / projects / environments / property groups for different projects within the organization. 

### Features
* Centralized management of all the projects, release, environments
* Comes with a clean UI for managing all the properties for the projects
* Comes with a clean set of REST API's 
* All the API's are being documented with the help of  SWAGGER for easy available at http://localhost:3000/swagger (assuming installed on local server). In the Swagger UI just type the API DOCS JSON Path http://localhost:3000/swagger/api-docs.json and all the API will be listed which can be tested very easily via UI. 

### Installation
    1. git clone https://github.com/panbhatt/propserver
    2. npm install
    3. bower install 
    4. npm start -- --dbUrl=localhost:192.168.191.110:27017/propserver
        if the command line parameter is not provided, the application will try to connecc to the local mongodb present on the same system where the application is installed. 
    5. npm start
    This will start the application on http://localhost:3000
    Swagger will be available on http://localhost:3000/swagger

### Pre-Requisties
* NodeJS must be installed with NVM as the package manager for NODE.
* Bower must be installed globally as the UI project is based on the Angular n Bootstrap where bower is used to manage all the dependencies.


## Introduction

Property Manager is used to manage the properties for different projects. It is very essential to understand these Entities before moving forward with the installation and usage of the project. 
* Project 
   This entity refers to a project in the system which is being managed by the server. All properties groups/ releases will be tied to a project.  
* Environment
   This refers to all the environments which are being managed by the property server. E.g. DEV, QA, PROD. Environments are global in the system whcih means once a environment is being added it will be available to all the projects irrespective of the place where it is added. 
* Release
   This refers to a RELEASE of a project. Every project will have its own release and all the properites will fall under a property group for a specific release i.e. if a key is present in one release it can be missing in another. Everytime we are trying to modify the keys it will be only application for a specific release of a project.  
* Property Group
  This refers to a way of grouping multiple properties into its own group. Eg. for a specific project (P1) for a release (1.0) in environment (DEV), can be classified into three different properties groups
    1. DB -> it contain all the properties (like HOST, PORT, Username, Password) related to the datbase for the project.
    2. Cache -> It contain all the properties (like HOST, PORT, Username, Password) related to the cache of the application.
    3. Integration -> It contains the URL, usersname, passwords of all the third parties to which the project is doing integration with. 

### PROP Server Clients
* NodeJS ->  https://github.com/panbhatt/propserver-node-client
* Java -> Coming Soon...

### API 
All the API's of the project is available at the swagger console, http://localhost:3000/swagger. We need to enter the path of the API DOCS JSON before getting a list of all the API's being presented by the Server, which can be tested at same time to get a feel of how the client needs to be coded. 

## LICENSE - "Free to Use - Just Inform Me :), if you like it. "


Copyright (c) 2015 Pankaj Bhatt 

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
