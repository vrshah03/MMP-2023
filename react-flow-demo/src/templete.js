//Priorities are 1,2,3, and 4 (highest to lowest)
/*Requirements of 
priority 1 are mandatory for the first implementation; 
priority 2 are mandatory for the final implementation; 
priority 3 is used for optional features that the client would like to have; 
priority 4 is used for optional features.*/
const req1 = [{
    "requirements Identifier" : "REQ005",
    "requirements text" : "login",
    "Rel" : 1,
    "dep": ['OR', "REQ001", ['AND', "REQ002","REQ003"],"REQ004"],
    "Module" : "from processing",
    "Priority" : 1,
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ001",
    "requirements text" : "sign up",
    "Rel" : 0,
    "dep": [],
    "Module" : "",
    "Priority" : 3,
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ002",
    "requirements text" : "username",
    "Rel" : 0,
    "dep": [],
    "Module" : "login",
    "Priority" : 2,
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ003",
    "requirements text" : "password",
    "Rel" : 0,
    "dep": [],
    "Module" : "login",
    "Priority" : 2,
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ004",
    "requirements text" : "Loing with Google",
    "Rel" : 0,
    "dep": [],
    "Module" : "",
    "Priority" : 4,
    "Risk" : "",
  },]

  const req2 = [
    {
      "requirements Identifier": "REQ101",
      "requirements text": "User profile creation",
      "Rel": 1,
      "dep": ["REQ102", "REQ103"],
      "Module": "User Management",
      "Priority": 2,
      "Risk": "Low"
    },
    {
      "requirements Identifier": "REQ102",
      "requirements text": "User registration",
      "Rel": 0,
      "dep": [],
      "Module": "Authentication",
      "Priority": 3,
      "Risk": "Medium"
    },
    {
      "requirements Identifier": "REQ103",
      "requirements text": "User authentication",
      "Rel": 0,
      "dep": [],
      "Module": "Authentication",
      "Priority": 2,
      "Risk": "Low"
    },
    {
      "requirements Identifier": "REQ104",
      "requirements text": "User profile editing",
      "Rel": 1,
      "dep": ["REQ101"],
      "Module": "User Management",
      "Priority": 4,
      "Risk": "Medium"
    },
    {
      "requirements Identifier": "REQ105",
      "requirements text": "Admin role creation",
      "Rel": 0,
      "dep": [],
      "Module": "User Management",
      "Priority": 3,
      "Risk": "High"
    }
  ]
  
  export default req1;
  // module.exports = requirements;