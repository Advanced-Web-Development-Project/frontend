import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    name: yup.string().required('name is required'),
    email: yup.string().required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(10, 'Password must be at most 10 characters'),
    matchedPassword: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});
