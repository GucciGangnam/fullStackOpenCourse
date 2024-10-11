// Imports 
// REact 
import { useState } from "react";


// HOOKS

// useField
export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => { 
        setValue(event.target.value);
    }

    return { 
        type, 
        value, 
        onChange
    }
}