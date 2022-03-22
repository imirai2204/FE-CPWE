export const BASE_URL = "http://851d-27-64-142-237.ngrok.io";

export const Authen = {
    /** testing with firebase, please make an update when integrating with BE */
    login: "/authen/sign-in.json",
    loginFail: "/authen/signin.json",
    /***********************************/
    checkPermission: "/authen/check-permission",
};

export const IdeaUrl = {
    create: "/idea/create",
};

export const AcademicUrl = {
    create: "/academic-year/create",
    get: "/academic-year/get",
    getSemesterByYear: "/academic-year/get-semester-by-year",
};

export const TopicUrl = {
    create: "/topic/create",
    get: "/topic/get",
};

export const CategoryUrl = {
    create: "/category/create",
    get: "/category/get",
};

export const DepartmentUrl = {
    create: "/department/create",
    get: "/department/get",
};
