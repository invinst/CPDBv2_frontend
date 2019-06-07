import { has } from 'lodash';

export const createPinboard = () => ({
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
  'description': '',
});

const pinboards = {
  '5cd06f2b': {
    'id': '5cd06f2b',
    'title': 'Pinboard Title',
    'officer_ids': [1234],
    'crids': ['1234567'],
    'trr_ids': [1234],
    'description': 'Pinboard Description',
  }
};

export function getOrCreateEmptyPinboard(pinboardId) {
  if (!has(pinboards, pinboardId)) {
    pinboards[pinboardId] = {
      'id': pinboardId,
      'title': '',
      'officer_ids': [],
      'crids': [],
      'trr_ids': [],
      'description': '',
    };
  }
  return pinboards[pinboardId];
}

export function updatePinboard(pinboard) {
  const oldPinboard = getOrCreateEmptyPinboard(pinboard.id);
  pinboards[pinboard.id] = { ...oldPinboard, ...pinboard };
  return pinboards[pinboard.id];
}

export const fetchEmptyPinboard = () => ({
  'id': 'abcd1234',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
});

export const updatePinboardTitleParams = () => ({
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
});

export const updatedPinboardTitle = () => ({
  'id': '5cd06f2b',
  ...updatePinboardTitleParams()
});

export const updatePinboardDescriptionParams = () => ({
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Updated Description',
});

export const updatedPinboardDescription = () => ({
  'id': '5cd06f2b',
  ...updatePinboardDescriptionParams()
});
