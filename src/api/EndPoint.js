export const BASE_URL = "http://0ff6-113-23-31-31.ngrok.io";

export const Authen = {
    login: BASE_URL + "/authen/signin",
    checkPermission: BASE_URL + "/authen/check-permission",
};

export const IdeaUrl = {
    create: BASE_URL + "/idea/create"
}

export const AcademicUrl = {
    create: BASE_URL + "/academic-year/create",
    get: BASE_URL + "/academic-year/get"
}

export const TopicUrl = {
    create: BASE_URL + "/topic/create",
    get: BASE_URL + "/topic/get"
}

export const CategoryUrl = {
    create: BASE_URL + "/category/create",
    get: BASE_URL + "/category/get"
}

export const DepartmentUrl = {
    create: BASE_URL + "/department/create",
    get: BASE_URL + "/department/get"
}
