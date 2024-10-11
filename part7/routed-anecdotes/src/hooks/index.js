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

    const clear = () => { 
        setValue('')
    }

    return { 
        type, 
        value, 
        onChange,
        clear
    }
}