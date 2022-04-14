export const Authen = {
    login: "/authen/signin",
    checkPermission: "/authen/check-permission",
};

export const IdeaUrl = {
    create: "/idea/create",
    get: "/idea/get/",
    getList: "/idea/get"
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

export const UserUrl = {
    create: "authen/signup",
    get: "user/get",
    update: "user/update/",
    changePass: "user/change-pass"
};

export const PermissionUrl = {
    create: "/create",
    get: "/role/permission/get",
};

export const RoleUrl = {
    create: "/role/create",
    get: "/role/get",
    update: "/role/update/",
    authen: "role/permission/check/"
};

export const Flag = {
    manageUser: "MUSER",
    manageRole: "MROLE",
    manageSemester: "MSEMES",
    manageDepartment: "MDEPT",
    manageTopic: "MTOPIC",
    manageCategory: "MCATE"
}

export const Warn = {
    noPermission: "You have no permission",
    noExist: "The requested page was not found"
}