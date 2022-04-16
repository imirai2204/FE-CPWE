export const getComments = async () => {
    return [
        {
            id: "1",
            body: "First comment",
            username: "Tu",
            userId: "1",
            parent: null,
            createdAt: "2022-04-09T23:00:33.010+07:00",
        },
        {
            id: "2",
            body: "Second comment",
            username: "Tai",
            userId: "2",
            parent: null,
            createdAt: "2022-04-09T23:00:33.010+07:00",
        },
        {
            id: "3",
            body: "First comment first child",
            username: "Khiem",
            userId: "3",
            parent: "1",
            createdAt: "2022-04-09T23:00:33.010+07:00",
        },
        {
            id: "4",
            body: "Second comment second child",
            username: "Tung",
            userId: "4",
            parent: "2",
            createdAt: "2022-04-09T23:00:33.010+07:00",
        },
    ];
};

export const createComment = async (text, parent = null, userId, userName) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parent,
        userId: userId,
        username: userName,
        createdAt: new Date().toISOString(),
    };
};

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};
