export const createNewPinboardParams = {
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
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
