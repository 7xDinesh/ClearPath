/**
 * Questionnaire configuration — field definitions and step layout.
 */

export const INITIAL_PROFILE = {
  fullName: '',
  age: '',
  state: '',
  country: '',
  degreeLevel: '',
  fieldOfStudy: '',
  academicScore: '',
  familyIncome: '',
  gender: '',
  disabilityStatus: '',
  category: '',
  firstGeneration: '',
};

export const QUESTIONNAIRE_STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    fields: ['fullName', 'age', 'gender'],
  },
  {
    id: 'location',
    title: 'Location',
    fields: ['state', 'country'],
  },
  {
    id: 'academic',
    title: 'Academic Background',
    fields: ['degreeLevel', 'fieldOfStudy', 'academicScore'],
  },
  {
    id: 'financial',
    title: 'Financial & Background',
    fields: ['familyIncome', 'disabilityStatus', 'category', 'firstGeneration'],
  },
];

export const FIELD_CONFIG = {
  fullName: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },
  age: {
    label: 'Age',
    type: 'number',
    placeholder: 'e.g. 19',
    required: true,
    min: 14,
    max: 60,
  },
  state: {
    label: 'State / Province',
    type: 'text',
    placeholder: 'e.g. New Delhi',
    required: true,
  },
  country: {
    label: 'Country',
    type: 'text',
    placeholder: 'e.g. India',
    required: true,
  },
  degreeLevel: {
    label: 'Degree Level',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select degree level' },
      { value: 'diploma', label: 'Diploma' },
      { value: 'undergraduate', label: 'Undergraduate' },
      { value: 'postgraduate', label: 'Postgraduate' },
      { value: 'doctoral', label: 'Doctoral' },
    ],
  },
  fieldOfStudy: {
    label: 'Field of Study',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select field of study' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'science', label: 'Science' },
      { value: 'technology', label: 'Technology' },
      { value: 'commerce', label: 'Commerce / Business' },
      { value: 'arts', label: 'Arts / Humanities' },
      { value: 'medicine', label: 'Medicine' },
      { value: 'law', label: 'Law' },
      { value: 'other', label: 'Other' },
    ],
  },
  academicScore: {
    label: 'Academic Score (%)',
    type: 'number',
    placeholder: 'e.g. 82',
    required: true,
    min: 0,
    max: 100,
  },
  familyIncome: {
    label: 'Annual Family Income (local currency)',
    type: 'number',
    placeholder: 'e.g. 450000',
    required: true,
    min: 0,
  },
  gender: {
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select gender' },
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'non-binary', label: 'Non-binary' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  disabilityStatus: {
    label: 'Disability Status',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select status' },
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
  },
  category: {
    label: 'Category / Social Group',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select category' },
      { value: 'general', label: 'General' },
      { value: 'obc', label: 'OBC' },
      { value: 'sc', label: 'SC' },
      { value: 'st', label: 'ST' },
      { value: 'minority', label: 'Minority' },
      { value: 'other', label: 'Other' },
    ],
  },
  firstGeneration: {
    label: 'First Generation Student',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select option' },
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
};
