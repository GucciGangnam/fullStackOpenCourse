// Type 
type analysis = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
interface ValidInputs {
    dailyExercises: number[];
    target: number;
}

const parseExerciseArgs = (args: string[]): ValidInputs => {
    if (args.length !== 2) {
        throw new Error('Expected exactly two arguments: daily_exercises and target.');
    }

    // Parse the first argument as an array of numbers
    let dailyExercises: number[];
    try {
        dailyExercises = JSON.parse(args[0]);
        if (!Array.isArray(dailyExercises) || !dailyExercises.every(num => typeof num === 'number')) {
            throw new Error('Invalid format for daily_exercises. Must be an array of numbers.');
        }
    } catch (error) {
        throw new Error('Invalid JSON format for daily_exercises.');
    }

    // Parse the second argument as a number
    const target = Number(args[1]);
    if (isNaN(target)) {
        throw new Error('Target must be a valid number.');
    }

    return { dailyExercises, target };
};

const calculateExercises = (array: number[], target: number): analysis => {
    const days = array.length;
    const sumOfHours = array.reduce((x, y) => x + y, 0);
    const average = sumOfHours / days;

    // Set a rating based on performance
    let rating: number;
    let description: string;

    if (average < target) {
        rating = 1;
        description = "Not good enough.";
    } else if (average >= target && average < target + 1) {
        rating = 2;
        description = "Great work!";
    } else {
        rating = 3;
        description = "You're a beast!";
    }

    return {
        periodLength: days,
        trainingDays: array.filter(d => d > 0).length,
        success: average >= target,
        rating,
        ratingDescription: description,
        target,
        average,
    };
};

try {
    console.log("Received arguments:", process.argv.slice(2));
    const { dailyExercises, target } = parseExerciseArgs(process.argv.slice(2));
    const result = calculateExercises(dailyExercises, target);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
}


// CALLS 

