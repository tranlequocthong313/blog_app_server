import prisma from '../../../prisma/client';
import { IUserInput } from './user.type';

export default {
    create: async (userInput: IUserInput) => {
        return await prisma.user.create({ data: userInput });
    },
    findOne: async (query: object) => {
        return await prisma.user.findUnique({ where: query });
    }
};
