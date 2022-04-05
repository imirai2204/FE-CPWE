import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const DepartmentSchema = Yup.object().shape({
    department: Yup.string().required("Sorry, Department name is required"),
});

export const PermissionSchema = Yup.object().shape({
    permissionName: Yup.string().required("Sorry, Permission name is required"),
    permissionURL: Yup.string().required("Sorry, Screen URL is required"),
});

export const TagSchema = Yup.object().shape({
    category: Yup.string().required("Sorry, Tag name is required"),
    topicId: Yup.number().min(1, "Sorry, Topic name is required"),
});

var date = new Date();
date.setHours(0, 0, 0, 0);

export const AcademicYearSchema = Yup.object().shape({
    year: Yup.string().required("Sorry, Year is required"),
    semester: Yup.string().required("Sorry, Semester name is required"),
    startDate: Yup.date().required("Sorry, Start Date is required").min(date),
    endDate: Yup.date().required("Sorry, End Date is required").min(Yup.ref('startDate')),
});

export const TopicSchema = Yup.object().shape({
    // yearId: Yup.number().min(1, "Sorry, Year is required"),
    semesterId: Yup.number().min(1, "Sorry, Semester is required"),
    departmentId: Yup.number().min(1, "Sorry, Department is required"),
    topic: Yup.string().required("Sorry, Topic name is required"),
    endDate: Yup.date().required("Sorry, Closure Date is required").min(date),
    finalEndDate: Yup.date().required("Sorry, Final Date is required").min(Yup.ref('endDate')),
});

export const IdeaSchema = Yup.object().shape({
    departmentId: Yup.number().min(1, "Required"),
    topicId: Yup.number().min(1, "Required"),
    categoryId: Yup.number().min(1, "Required"),
    title: Yup.string()
        .required("Title is required")
        .min(10, "Title should have at least 10 characters")
        .max(50, "Title should have less than 50 characters"),
    description: Yup.string()
        .min(10, "Description should have at least 10 characters")
        .max(1000, "Description should have less than 1000 characters"),
    contributor: Yup.boolean().required("Required"),
});

export const UserSchema = Yup.object().shape({
    firstname: Yup.string().required("Sorry, Firstname is required"),
    lastname: Yup.string().required("Sorry, Lastname is required"),
    address: Yup.string()
        .min(10, "Title should have at least 10 characters")
        .max(50, "Title should have less than 50 characters"),
    // gender: Yup.number().min(1, "Sorry, Gender is required"),
    email: Yup.string().email("Invalid email").required("Sorry, Email is required"),
    phone: Yup.string()
        .matches(/^(\\+[1-9]{1,4}[ \\-]*)|([0-9]{2,4}[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Sorry, Phone number is not valid')
        .max(12, "Phone number should have less than 12 characters"),
    departmentId: Yup.number().min(1, "Sorry, Department is required"),
    roleId: Yup.number().min(1, "Sorry, User Role is required"),
});

export const PasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Sorry, Old password is required"),
    newPassword: Yup.string().required("Sorry, New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Confirm password does not match')
        .required("Sorry, Confirm password is required"),
});

export const RoleSchema = Yup.object().shape({
    roleName: Yup.string().required("Sorry, Role name is required"),
    topicId: Yup.number().required(1, "Sorry, Topic name is required"),
});

