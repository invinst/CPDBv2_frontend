export const createNewPinboardParams = {
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
};

export const pinboardData = {
  'id': 'ceea8ea3',
  'title': 'Pinboard Title',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description',
};

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

export const emptyCreatedPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};
