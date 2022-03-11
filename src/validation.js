import * as Yup from "yup";
import {
    Departments,
    Topics,
    Tags,
    Contributor,
} from "../src/components/Navbar/dropdown/DropdownItems";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|([0-9]{2,4}[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const DepartmentSchema = Yup.object().shape({
    departmentName: Yup.string().required("Sorry, that department doesn't exist!"),
});

export const AcademicYearSchema = Yup.object().shape({
    year: Yup.string().required("Sorry, that year doesn't have any related information!"),
});

export const TopicSchema = Yup.object().shape({
    topic: Yup.string().required("Sorry, that topic doesn't exist!"),
});


// let departmentLabel = Departments.map((item) => item.label);
// let contributor = Contributor.map((item) => item.label);
// let topicLabel = Topics.map((item) => item.label);
// let tagsLabel = Tags.map((item) => item.label);

export const IdeaSchema = Yup.object().shape({
    // department: Yup.mixed().oneOf(departmentLabel, "Must Select A Department"),
    // contributor: Yup.mixed().oneOf(contributor, "Must Select Contributor Type"),
    department: Yup.object().required("Department is required").nullable(),
    topic: Yup.object().required("Topic is required").nullable(),
    tag: Yup.object().required("Tag is required").nullable(),
    title: Yup.string()
        .required("Title is required")
        .min(10, "Title should have at least 10 characters")
        .max(50, "Title should have less than 50 characters"),
    description: Yup.string()
        .min(50, "Description should have at least 50 characters")
        .max(1000, "Description should have less than 1000 characters"),
    contributor: Yup.object().required("Contributor is required").nullable(),
});
