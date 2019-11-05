import React from "react";

export const required = (value) => {
    if (value) return undefined;
    return 'Field is required'
};
export const minLength = (minLength) => (value) => {
    if (value.length < minLength) return `Must be ${minLength} characters or more`;
    return undefined
};


