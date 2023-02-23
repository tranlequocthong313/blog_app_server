import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.model == 'user' && params.action == 'create') {
        params.args.data.password = await bcrypt.hash(params.args.data.password, await bcrypt.genSalt(10));
    }

    const result = await next(params);
    // See results here
    return result;
});


export default prisma;
