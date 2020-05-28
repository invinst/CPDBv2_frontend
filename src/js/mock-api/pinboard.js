import { has } from 'lodash';

export const emptyPinboard = (id='abcd1234') => ({
  'id': id,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'example_pinboards': [{
    'description': '**It will be a election** and we are going to do the best '
      + '**Lorem Ipsum is simply dummy text of the printing and typesetting industry.**'
      + 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    'id': 'b20c2c36',
    'title': 'Watts Crew',
  }, {
    'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang tactical.',
    'id': '22e66085',
    'title': 'Skullcap Crew',
  }],
});

export const createPinboard = (id='5cd06f2b', officerIds=[1], crids=[], trrIds=[], notFoundItems, title='') => {
  const withNotFoundItems = notFoundItems ? { 'not_found_items': notFoundItems } : {};
  return {
    'id': id,
    'title': title,
    'officer_ids': officerIds,
    'crids': crids,
    'trr_ids': trrIds,
    'description': '',
    ...withNotFoundItems,
  };
};

export const pinboardsList = [
  {
    'id': 'ceea8ea3',
    'title': 'Pinboard title',
    'created_at': '2019-09-12',
  },
  {
    'id': '77edc128',
    'title': '',
    'created_at': '2019-10-15',
  },
];

export const pinboards = {
  '87e31b82': {
    'id': '87e31b82',
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
      'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang.',
      'id': '22e66085',
      'title': 'Skullcap Crew',
    }],
  },
  'ceea8ea3': {
    'id': 'ceea8ea3',
    'title': 'Pinboard Title',
    'officer_ids': [1234],
    'crids': ['1234567'],
    'trr_ids': [1234],
    'description': 'Pinboard Description',
  },
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
  '77edc128': {
    'id': '77edc128',
    'title': '',
    'officer_ids': [1234],
    'crids': ['1234567'],
    'trr_ids': [1234],
    'description': 'Description for 77edc128',
  },
  'abcd5678': {
    'id': 'abcd5678',
    'title': 'Pinboard Title',
    'officer_ids': [1],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd5678',
  },
  'abcd8765': {
    'id': 'abcd8765',
    'title': 'Pinboard Title',
    'officer_ids': [1],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd8765',
  },
  'dcab5678': {
    'id': 'dcab5678',
    'title': 'Pinboard Title',
    'officer_ids': [1],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for dcab5678',
  },
  'e25aa777': {
    'id': 'e25aa777',
    'title': '',
    'officer_ids': [1],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for e25aa777',
  },
  'e25aa888': {
    'id': 'e25aa888',
    'title': '',
    'officer_ids': [2],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for e25aa888',
  },
  'e25aa999': {
    'id': 'e25aa999',
    'title': '',
    'officer_ids': [3],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for e25aa999',
  },
  'abcd1234': emptyPinboard(),
  'ffff6666': {
    'id': 'ffff6666',
    'title': '',
    'officer_ids': [1, 2],
    'crids': ['5678123'],
    'trr_ids': [3, 2],
    'description': '',
  },
};

export function getOrCreateEmptyPinboard(pinboardId='5cd06f2b') {
  if (!has(pinboards, pinboardId)) {
    pinboards[pinboardId] = emptyPinboard(pinboardId);
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
