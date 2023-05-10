export var ExerciseType;
(function (ExerciseType) {
    ExerciseType[ExerciseType["Push"] = 0] = "Push";
    ExerciseType[ExerciseType["Pull"] = 1] = "Pull";
    ExerciseType[ExerciseType["Leg"] = 2] = "Leg";
})(ExerciseType || (ExerciseType = {}));
export class Exercise {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
export const exercises = [
    new Exercise(1, "Push Up"),
    new Exercise(2, "Pull Up"),
    new Exercise(3, "L-sit"),
    new Exercise(4, "Handstand"),
    new Exercise(6, "Muscle Up"),
    new Exercise(8, "Squat"),
    new Exercise(9, "Pistol Squat"),
    new Exercise(10, "Triceps Extension"),
    new Exercise(11, "Lunges"),
    new Exercise(12, "Nordic Curls"),
    new Exercise(13, "Bicep Curls"),
];
//# sourceMappingURL=exercise.js.map