const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


// router.get("/api/workouts", (req, res) => {
//     Workout.find({})
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

router.get("/api/workouts/range", (req, res) => {
    // Workout.find({}).limit(10)
    // .then(dbWorkout => {
    // res.json(dbWorkout);
    // })
    // .catch(err => {
    //     res.status(400).json(err);
    // });

    Workout.aggregate([
        { 
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
           }
        }
    ])
    .sort({_id : -1})
    .limit(5)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
            res.status(400).json(err);
        });


});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        { 
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
           }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    
})
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, {$push: { exercises: body}}, {new: true})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.delete("/api/workouts", ({body}, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch (err => {
        res.status(400).json(err);
    });
});

module.exports = router;
