//Priorities are 1,2,3, and 4 (highest to lowest)
/*Requirements of 
priority 1 are mandatory for the first implementation; 
priority 2 are mandatory for the final implementation; 
priority 3 is used for optional features that the client would like to have; 
priority 4 is used for optional features.*/
const req1 = [{
    "Requirement Identifier" : "REQ005",
    "Requirement Text" : "login",
    "Requirement Relationship" : 1,
    "Dependencies": ['OR', "REQ001", ['AND', "REQ002","REQ003"],"REQ004"],
    "Module" : "from processing",
    "Priority" : 1,
    "Risk" : "Critical",
  },
  {
    "Requirement Identifier" : "REQ001",
    "Requirement Text" : "sign up",
    "Requirement Relationship" : 0,
    "Dependencies": [],
    "Module" : "",
    "Priority" : 3,
    "Risk" : "Low",
  },
  {
    "Requirement Identifier" : "REQ002",
    "Requirement Text" : "username",
    "Requirement Relationship" : 0,
    "Dependencies": [],
    "Module" : "login",
    "Priority" : 2,
    "Risk" : "Medium",
  },
  {
    "Requirement Identifier" : "REQ003",
    "Requirement Text" : "password",
    "Requirement Relationship" : 0,
    "Dependencies": [],
    "Module" : "login",
    "Priority" : 2,
    "Risk" : "Critical",
  },
  {
    "Requirement Identifier" : "REQ004",
    "Requirement Text" : "Loing with Google",
    "Requirement Relationship" : 0,
    "Dependencies": [],
    "Module" : "",
    "Priority" : 4,
    "Risk" : "Low",
  },]

  const req2 = [
    {
      "Requirement Identifier": "REQ101",
      "Requirement Text": "User profile creation",
      "Requirement Relationship": 1,
      "Dependencies": ["REQ102", "REQ103"],
      "Module": "User Management",
      "Priority": 2,
      "Risk": "Low"
    },
    {
      "Requirement Identifier": "REQ102",
      "Requirement Text": "User registration",
      "Requirement Relationship": 0,
      "Dependencies": [],
      "Module": "Authentication",
      "Priority": 3,
      "Risk": "Medium"
    },
    {
      "Requirement Identifier": "REQ103",
      "Requirement Text": "User authentication",
      "Requirement Relationship": 0,
      "Dependencies": [],
      "Module": "Authentication",
      "Priority": 2,
      "Risk": "Low"
    },
    {
      "Requirement Identifier": "REQ104",
      "Requirement Text": "User profile editing",
      "Requirement Relationship": 1,
      "Dependencies": ["REQ101"],
      "Module": "User Management",
      "Priority": 4,
      "Risk": "Medium"
    },
    {
      "Requirement Identifier": "REQ105",
      "Requirement Text": "Admin role creation",
      "Requirement Relationship": 0,
      "Dependencies": [],
      "Module": "User Management",
      "Priority": 3,
      "Risk": "High"
    }
  ]
  
  export default req1;
  // module.exports = requirements;