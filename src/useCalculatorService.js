import { useState } from 'react';

export const useCalculatorService = () => {
    let [ valueShow, setValueShow ] = useState(0)
    let [ previousValue, setPreviousValue ] = useState(0)
    let [ el, setEl ] = useState('0')
    let [ previousOperation, setPreviousOperation]  = useState('+')

    const setValue = (newValue) => {
        const result = el === "0" ? newValue.toString() : el.concat(newValue.toString())
        setEl(result)
        setValueShow(convertStringToInt(result))
    }
    const setOperation = (operation) => {
        if (operation === '=') {
            setValueShow(getResultOperation(previousValue, previousOperation, convertStringToInt(el)))
            setPreviousValue(0)
            setEl('0')
            setPreviousOperation('+')
        }
        else if (operation === 'CE') {
            setPreviousValue(0)
            setEl('0')
            setPreviousOperation('+')
            setValueShow(0)
        }
        else {
            setPreviousValue(getResultOperation(previousValue, previousOperation, convertStringToInt(el)))
            setEl('0')
            setPreviousOperation(operation)
            setValueShow(0)
        }
    }
    return {
        result: valueShow,
        setValue,
        setOperation
    }
}

const convertStringToInt = (value) => parseInt(value)
const getResultOperation = (value1, operation, value2) => {
    switch (operation) {
        case '+':
            return value1 + value2
        case '-':
            return value1 - value2
        case '*':
            return value1 * value2
        case '/':
            return value1 / value2
        default:
            return 0;
    }
}