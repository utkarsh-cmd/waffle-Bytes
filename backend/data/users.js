import bcrypt from 'bcryptjs';

const users = [
    {
        name:'utkarsh',
        email:'a@a.com',
        password :bcrypt.hashSync('a'),
        contact:8826348428,
    },
    {
        name:'waffle Bytes',
        email:'b@b.com',
        password :bcrypt.hashSync('b'),
        contact:8826348428,
    }
]
export default users