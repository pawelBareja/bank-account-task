import * as Yup from 'yup';

const ERROR_MESSAGES = {
  required: 'Field is required',
  minString: (min: number) => `Min. numberof characters is ${min}`,
  maxString: (max: number) => `Max. numberof characters is ${max}`,
  whiteSpace: 'Remove blank spaces',
  sentence_alike: 'Remove blank spaces',
};

const WHITESPACE_PATTERN = /^\S*$/;
const SENTENCE_ALIKE_REGEX = /^(?! )[-A-Za-z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż. ]+(?<! )$/;

export const isRequired = Yup.string().required(ERROR_MESSAGES.required);

export const stringLengthValidation = (min = 2, max = 30) =>
  Yup.string()
    .min(min, ERROR_MESSAGES.minString(min))
    .max(max, ERROR_MESSAGES.maxString(max))
    .required(ERROR_MESSAGES.required);

export const stringLengthValidationWithWhiteSpace = (min = 2, max = 30) =>
  Yup.string()
    .min(min, ERROR_MESSAGES.minString(min))
    .max(max, ERROR_MESSAGES.maxString(max))
    .required(ERROR_MESSAGES.required)
    .matches(WHITESPACE_PATTERN, ERROR_MESSAGES.whiteSpace);

export const sentenceAlikeValidation = (min = 2, max = 30) =>
  Yup.string()
    .min(min, ERROR_MESSAGES.minString(min))
    .max(max, ERROR_MESSAGES.maxString(max))
    .required(ERROR_MESSAGES.required)
    .matches(SENTENCE_ALIKE_REGEX, ERROR_MESSAGES.sentence_alike);
