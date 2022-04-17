export const ColumnsDepartment = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "department", label: "Department Name", width: "50%", align: "left" },
];

export const ColumnsUser = [
    { id: "id", label: "User ID", width: "15%", align: "center", style: { left: "13px" } },
    { id: "fullname", label: "Full Name", width: "15%", align: "left" },
    { id: "email", label: "Email", width: "15%", align: "left" },
    { id: "department", label: "Department", width: "10%", align: "left" },
    { id: "role", label: "Role", width: "10%", align: "left" },
    { id: "phone", label: "Phone", width: "10%", align: "left" },
    { id: "address", label: "Address", width: "25%", align: "left" },
];

export const ColumnsPermission = [
    { id: "permissionName", label: "Permission Name", width: "20%", align: "left" },
    { id: "permissionURL", label: "Screen URL", width: "30%", align: "left" },
];

export const ColumnsRole = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "roleName", label: "Role Name", width: "20%", align: "left" },
    { id: "permission", label: "Permission", width: "20%", align: "center", style: { left: "13px" } },
];

export const ColumnsCategory = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "tagLabel", label: "Tag Name", width: "20%", align: "left" },
    { id: "topicLabel", label: "Topic Name", width: "20%", align: "left" },
];

export const ColumnsTopic = [
    { id: "id", label: "ID", width: "3%", align: "center", style: { left: "13px" } },
    { id: "topic", label: "Topic", width: "10%", align: "left" },
    { id: "year", label: "Year", width: "3%", align: "center", style: { left: "13px" } },
    { id: "semester", label: "Semester", width: "15%", align: "left" },
    { id: "department", label: "Department", width: "15%", align: "left" },
    { id: "startDate", label: "Start Date", width: "10%", align: "left" },
    { id: "closureDate", label: "Closure Date", width: "10%", align: "left" },
    { id: "finalDate", label: "Final Date", width: "13%", align: "left" },
];

export const ColumnsSemester = [
    { id: "id", label: "ID", width: "5%", align: "center", style: { left: "13px" } },
    { id: "year", label: "Year", width: "5%", align: "center", style: { left: "13px" } },
    { id: "semester", label: "Semester", width: "40%", align: "left" },
    { id: "startDate", label: "Start Date", width: "20%", align: "left" },
    { id: "endDate", label: "End Date", width: "20%", align: "left" },
];

export const ColumnsIdea = [
    { id: "topic", label: "Topic", width: "10%", align: "center", style: { left: "13px" } },
    { id: "category", label: "Tag", width: "10%", align: "center", style: { left: "13px" } },
    { id: "title", label: "Title", width: "20%", align: "left", url: true},
    { id: "author", label: "Author", width: "15%", align: "left" },
];