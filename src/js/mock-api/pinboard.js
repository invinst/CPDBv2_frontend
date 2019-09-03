import { has } from 'lodash';

const emptyPinboard = {
  'id': 'abcd1234',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'example_pinboards': [{
    'description': 'Officers with at least 10 complaints against them generate 64% of all complaints.',
    'id': 'b20c2c36',
    'title': 'Watts Crew',
  }, {
    'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang tactical...',
    'id': '22e66085',
    'title': 'Skullcap Crew',
  }],
};

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
  },
  '3664a7ea': {
    'id': '3664a7ea',
    'title': 'Pinboard Title',
    'officer_ids': [1234],
    'crids': ['1234567'],
    'trr_ids': [1234],
    'description': 'Pinboard Description',
  },
  'abcd1234': emptyPinboard,
};

export function getOrCreateEmptyPinboard(pinboardId='5cd06f2b') {
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

export const updatePinboardTitleParams = () => ({
  'title': 'Updated Title',
  'officer_ids': ['1234'],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
});

export const updatedPinboardTitle = () => ({
  'id': '5cd06f2b',
  ...updatePinboardTitleParams(),
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
  ...updatePinboardDescriptionParams(),
});
