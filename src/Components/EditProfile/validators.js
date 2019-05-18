import * as Yup from 'yup';

const emailSchema = Yup
  .string()
  .email('Incorrect email format')
  .required('Email is required');

const displayNameSchema = Yup
  .string()
  .min(3, 'Display name must be at least 3 characters long')
  .required('Display name is required');

export const validationSchema = Yup.object().shape({
  email: emailSchema,
  displayName: displayNameSchema
});
