import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='mb-2'>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className='text-area' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div>
    );
};
