export const updatePinboardTitleRequestData = {
  title: 'Updated Title',
  description: 'Pinboard Description',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
};

export const updatePinboardTitleResponseData = {
  id: 'abcd5678',
  ...updatePinboardTitleRequestData,
};

export const updatePinboardDescriptionRequestData = {
  ...updatePinboardTitleRequestData,
  description: 'Pinboard Description **Updated**',
};

export const updatePinboardDescriptionResponseData = {
  id: 'abcd5678',
  ...updatePinboardDescriptionRequestData,
};
