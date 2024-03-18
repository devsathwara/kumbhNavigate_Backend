
const multer=require("multer");
const eventSchema = require("../models/Event");


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

 const insert = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ message: "Multer error occurred", err: err });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ message: "Unknown error occurred", err: err });
    }

    // File uploaded successfully, continue with creating the event
    const { name, date, time, description } = req.body;
    const imagePath = req.file ? req.file.path : ''; // If file exists, set imagePath to the uploaded file path

    const newEvent = new eventSchema({
      name: name,
      date: date,
      time: time,
      description: description,
      imagePath: imagePath
    });

    newEvent.save().then(event => {
      res.status(201).json({
        message: "Event added successfully",
        event: event
      });
    }).catch(err => {
      res.status(500).json({
        message: "Internal server error",
        err: err
      });
    });
  });
};

 const getEvents = (req, res) => {
  const {id} = req.query;
  if(!id){


    eventSchema.find().then(events => {
        res.status(200).json({
            message: "Events fetched successfully",
            events: events
        });
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            err: err
        });
    });
  }else{
    eventSchema.findOne({_id:id}).then(event => {
        res.status(200).json({
            message: "Event fetched successfully",
            event: event
        });
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            err: err
        });
    });
  }
};
module.exports={insert,getEvents}