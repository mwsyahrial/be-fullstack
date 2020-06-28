module.exports = app => {
    const photobooks = require("../controllers/photobook.controller.js");
  
    var router = require("express").Router();
  
    // Create a new photobook
    router.post("/", photobooks.create);
  
    // Retrieve all photobooks
    router.get("/", photobooks.findAll);
  
    // Retrieve all published photobooks
    router.get("/published", photobooks.findAllPublished);
  
    // Retrieve a single photobook with id
    router.get("/:id", photobooks.findOne);
  
    // Update a photobook with id
    router.put("/:id", photobooks.update);
  
    // Delete a photobook with id
    router.delete("/:id", photobooks.delete);
  
    // Create a new photobook
    router.delete("/", photobooks.deleteAll);
  
    app.use('/api/photobooks', router);
  };
  