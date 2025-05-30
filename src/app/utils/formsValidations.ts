import { z } from "zod";
import { isValidPhoneNumber } from 'libphonenumber-js';

export const signInSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        email: z.string()
            .nonempty({ message: t('requiredField') })
            .email({ message: t('invalidEmail') })
        ,
        password: z.string()
            .nonempty({ message: t('requiredField') })
            .min(8, {
                message: t('passwordMinLength', { length: 8 }),
            })
    });

export const signUpSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        isCompany: z.boolean(),
        fullName: z.string()
            .nonempty({ message: t('requiredField') })
            .min(10, {
                message: t('fullNameMinLength', { length: 10 }),
            })
        ,
        email: z.string()
            .nonempty({ message: t('requiredField') })
            .email({ message: t('invalidEmail') })
        ,
        password: z.string()
            .nonempty({ message: t('requiredField') })
            .min(8, {
                message: t('passwordMinLength', { length: 8 }),
            })
        ,
        phone: z.string().nonempty({ message: t('requiredField') })
            .refine((val) => isValidPhoneNumber(val), {
                message: t('InvalidPhoneNumber'),
            }),
        confirmPassword: z.string()
            .nonempty({ message: t('requiredField') }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: t('passwordsDontMatch'),
        path: ['confirmPassword'],
    });

export const forgotPasswordSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        email: z.string()
            .nonempty({ message: t('requiredField') })
            .email({ message: t('invalidEmail') })
    });

export const otpSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        otp: z
            .string()
            .min(6, { message: t('otpLengthError') })
            .max(6, { message: t('otpLengthError') })
            .regex(/^\d{6}$/, { message: t('otpDigitsOnly') }),
    });

export const resetPasswordSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        password: z.string()
            .nonempty({ message: t('requiredField') })
            .min(8, {
                message: t('passwordMinLength', { length: 8 }),
            }),
        confirmPassword: z.string()
            .nonempty({ message: t('requiredField') }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: t('passwordsDontMatch'),
        path: ['confirmPassword'],
    });

export const contactUsSchema = (
    t: (key: string, params?: Record<string, any>) => string
) =>
    z.object({
        email: z.string()
            .nonempty({ message: t('requiredField') })
            .email({ message: t('invalidEmail') })
        ,
        fullName: z.string()
            .nonempty({ message: t('requiredField') })
            .min(10, {
                message: t('fullNameMinLength', { length: 10 }),
            })
        ,
        phone: z.string().nonempty({ message: t('requiredField') })
            .refine((val) => isValidPhoneNumber(val), {
                message: t('InvalidPhoneNumber'),
            }),
        subject: z.string()
            .nonempty({ message: t('requiredField') })
            .min(10, {
                message: t('subjectMinLength', { length: 10 }),
            }),
        message: z.string()
            .nonempty({ message: t('requiredField') })
            .min(10, {
                message: t('messageMinLength', { length: 10 }),
            })
            .max(250, {
                message: t('messageMaxLength', { length: 250 }),
            })
    });
