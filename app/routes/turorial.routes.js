module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/tutorials", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/tutorials", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/tutorials/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/tutorials/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/tutorials/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/tutorials/:id", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/tutorials", tutorials.deleteAll);


    const users = require("../controllers/user.controller.js");


    //
    router.post("/user", users.create);
    // 根据用户名查
    router.post("/user/all", users.findAll);
    router.get("/user/:id", users.findOne);
    router.delete("/user/:id", users.delete);
    router.delete("/users", users.deleteAll);
    router.put("/user/:id", users.update);

    app.use('/api', router);
};