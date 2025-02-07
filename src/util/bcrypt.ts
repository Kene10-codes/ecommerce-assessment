import * as bcryptjs from 'bcryptjs'


export const hashPassword = (password: string) => {
    const SALT = 10
    return bcryptjs.hashSync(password, SALT)
}

export const comparePassword = (password: string, dbPassword: string) => {
    return bcryptjs.compare(password, dbPassword)
}