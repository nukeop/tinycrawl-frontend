import * as Yup from 'yup';

const emailSchema = Yup
  .string()
  .email()
  .required('Email is required');

const displayNameSchema = Yup
  .string()
  .min(3)
  .required('Display name is required');

export const validationSchema = Yup.object().shape({
  email: emailSchema,
  displayName: displayNameSchema
});
