// 
interface inputs {
    height: number,
    weight: number
}

// Helper 
const parseArgs = (args: string[]): inputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

// Function 
const calculateBMI = (height: number, weight: number) => {
    // Calc
    let bmi = ((weight / (height * height)) * 10000);
    // Swicth
    if (bmi < 18) {
        return "Normal Range"
    }
    if (bmi > 18 && bmi < 25) {
        return "Normal Range"
    }
    if (bmi > 25) {
        return "Fatty"
    }
}
// Core
try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBMI(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}



// console.log(calculateBMI(186, 75))