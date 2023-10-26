let requirements = [{
    "requirements Identifier" : "REQ005",
    "requirements text" : "login",
    "Rel" : 1,
    "dep": ['OR', "REQ001", ['AND', "REQ002","REQ003"],"REQ004"],
    "Module" : "from processing",
    "Priority" : "",
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ001",
    "requirements text" : "sign up",
    "Rel" : 0,
    "dep": [],
    "Module" : "",
    "Priority" : "",
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ002",
    "requirements text" : "username",
    "Rel" : 0,
    "dep": [],
    "Module" : "login",
    "Priority" : "",
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ003",
    "requirements text" : "password",
    "Rel" : 0,
    "dep": [],
    "Module" : "login",
    "Priority" : "",
    "Risk" : "",
  },
  {
    "requirements Identifier" : "REQ004",
    "requirements text" : "Loing with Google",
    "Rel" : 0,
    "dep": [],
    "Module" : "",
    "Priority" : "",
    "Risk" : "",
  },]

  export default requirements;