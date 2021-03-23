const router = require("express").Router();
const workout = require("../models/workout.js");

//* Get Routes *//
// Retrieves saved workouts 
router.get("/api/workouts", (req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
// Retrieves workouts range 
router.get('/api/workouts/range', (req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});


//* Post Routes *//
// Add new workouts
router.post("/api/workouts", ({ body }, res) => {
  workout.create(body)
    .then(dbworkout => {
        console.log(dbworkout);
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//* Put Routes *//
// Update existing workouts
router.put("/api/workouts/:id", (req, res) => {
    workout.findByIdAndUpdate(req.params.id,
      {$push:{exercises: req.body}},
      {new: true}
    )
      .then(dbworkout => {
          console.log(dbworkout);
        res.json(dbworkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });





module.exports = router;
 