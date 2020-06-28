const db = require("../models");
const Photobook = db.photobooks;

// Create and Save a new Photobook
exports.create = (req, res) => {
   // Validate request
   if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Photobook
  const photobook = new Photobook({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Photobook in the database
  photobook
    .save(photobook)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the Photobook."
      });
    });
};

// Retrieve all Photobooks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Photobook.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving photobooks."
        });
      });
};

// Find a single Photobook with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Photobook.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Cannot found Photobook with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Photobook with id=" + id });
    });
};

// Update a Photobook by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Photobook.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Photobook with id=${id}. Maybe Photobook was not found!`
            });
          } else res.send({ message: "Photobook was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Photobook with id=" + id
          });
        });
};

// Delete a Photobook with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Photobook.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Photobook with id=${id}. Maybe Photobook was not found!`
          });
        } else {
          res.send({
            message: "Photobook was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Photobook with id=" + id
        });
      });
};

// Delete all Photobooks from the database.
exports.deleteAll = (req, res) => {
    Photobook.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Photobooks were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all photobooks."
      });
    });
};

// Find all published Photobooks
exports.findAllPublished = (req, res) => {
    Photobooks.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving photobooks."
      });
    });
};