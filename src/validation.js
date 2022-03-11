import * as Yup from "yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|([0-9]{2,4}[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const DepartmentSchema = Yup.object().shape({
    departmentName: Yup.string().required("Sorry, Department name is required"),
});

export const TagSchema = Yup.object().shape({
    tagName: Yup.string().required("Sorry, Tag name is required"),
    topicId: Yup.number().min(1, "Sorry, Topic name is required"),
});

export const AcademicYearSchema = Yup.object().shape({
    yearId: Yup.number().min(1, "Sorry, Year is required"),
    semester: Yup.string().required("Sorry, Semester name is required"),
    startDate: Yup.date().required("Sorry, Start Date is required"),
    endDate: Yup.date().required("Sorry, End Date is required").min(Yup.ref('startDate')),
});

export const TopicSchema = Yup.object().shape({
    yearId: Yup.number().min(1, "Sorry, Year is required"),
    semesterId: Yup.number().min(1, "Sorry, Semester is required"),
    departmentId: Yup.number().min(1, "Sorry, Department is required"),
    topic: Yup.string().required("Sorry, Topic Name is required"),
    closureDate: Yup.date().required("Sorry, Closure Date is required"),
    finalDate: Yup.date().required("Sorry, Final Date is required").min(Yup.ref('closureDate')),
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
