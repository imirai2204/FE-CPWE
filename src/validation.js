import * as Yup from "yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|([0-9]{2,4}[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
})

export const DepartmentSchema = Yup.object().shape({
    departmentName: Yup.string().required('Required'),
})

export const IdeaSchema = Yup.object().shape({
    title: Yup.string()
        .required("Required")
        .min(10, "Title should have at least 10 characters"),
    description: Yup.string()
        .required("Required")
        .min(10, "Description should have at least 50 characters"),
});