export const reducer = (state, action) => {
    const { validationResult, inputId, inputValue } = action;

    const updatedValues = {
        ...state.inputValues,
        [inputId]: inputValue,
    };

    const updatedValidities = {
        ...state.inputValidities,
        [inputId]: validationResult,
    };

    let updatedFormIsValid = true;

    for (const input in updatedValidities) {
        if (updatedValidities[input] !== undefined) {
            updatedFormIsValid = false;
            break;
        }
    }
    return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
    };
};
