import bcrypt from 'bcrypt';

const comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export default comparePassword


