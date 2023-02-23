interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    role: Role;
}

interface IUserInput {
    email: string;
    name: string;
    password: string;
}

enum Role {
    ADMIN,
    USER
}

export {
    IUser,
    IUserInput
};
