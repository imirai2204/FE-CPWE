import React from "react";
import { ErrorMessage, useField } from "formik";

export const Input = ({ lable, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='mb-2'>
            <lable htmlFor={field.name}>{lable}</lable>
            <input
                className={`form-control shadow-none ${
                    meta.touched && meta.error && "is-invalid"
                }`}
                {...field}
                {...props}
                autoComplete='off'
            />
            <ErrorMessage component='div' name={field.name} className='error' />
        </div>
    );
};
