export const Authen = {
    login: "/authen/signin",
    checkPermission: "/authen/check-permission",
};

export const IdeaUrl = {
    create: "/idea/create",
    update: "idea/update/files/",
    get: "/idea/get/",
    getList: "/idea/get",
    createcomment: "/idea/comment/create",
    fetchComment: "idea/comment/get",
    editComment: "idea/comment/edit/",
    deleteComment: "idea/comment/delete/",
    reaction: "/idea/reaction",
    getReaction: "/idea/get/status/",
    countView: "idea/view/create/",
    dashboard: "idea/dashboard/get",
    export: "file/report",
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
    delete: "category/delete/",
};

export const DepartmentUrl = {
    create: "/department/create",
    get: "/department/get",
};

export const UserUrl = {
    create: "authen/signup",
    get: "user/get",
    update: "user/update/",
    changePass: "user/change-pass",
};

export const PermissionUrl = {
    create: "/create",
    get: "/role/permission/get",
};

export const RoleUrl = {
    create: "/role/create",
    get: "/role/get",
    update: "/role/update/",
    authen: "role/permission/check/",
};

export const Flag = {
    manageUser: "MUSER",
    manageRole: "MROLE",
    manageSemester: "MSEMES",
    manageDepartment: "MDEPT",
    manageTopic: "MTOPIC",
    manageCategory: "MCATE",
};

export const Warn = {
    noPermission: "You have no permission",
    noExist: "The requested page was not found",
};
