export const paginationResponse = (apiSubPath, Factory) => (pinboardId, limit, offset, count=1000) => {
  const apiUrl = `/pinboards/${pinboardId}/${apiSubPath}/?`;
  const hasNext = count > offset + limit;
  let previous = null;
  if (offset)
    if (offset > limit)
      previous = `${apiUrl}limit=${ limit }&offset=${ offset - limit }`;
    else
      previous = apiUrl;
  return {
    count,
    next: hasNext ? `${apiUrl}limit=${ limit }&offset=${ offset + limit }` : null,
    previous,
    results: Factory.buildList(hasNext ? limit : Math.max(count - offset, 0)),
  };
};


export const createNewPinboardParams = {
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
};

export const pinboardData = {
  'id': 'abcd5678',
  'title': 'Pinboard Title',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description',
};

export const otherPinboardData = {
  'id': 'abcd1234',
  'title': '',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description for abcd1234',
};

export const emptyPinboard = {
  'id': 'abcd1234',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  'example_pinboards': [{
    'description': '**It will be a election** and we are going to do the best '
      + '**Lorem Ipsum is simply dummy text of the printing and typesetting industry.**'
      + 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
    'id': 'e12345',
    'title': 'Watts Crew',
  }, {
    'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang tactical.',
    'id': 'e23456',
    'title': 'Skullcap Crew',
  }],
};

export const wattsCrewPinboard = {
  'id': 'abcd1234',
  'title': 'Watts Crew',
  'description': '**It will be a election** and we are going to do the best '
      + '**Lorem Ipsum is simply dummy text of the printing and typesetting industry.**'
      + 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
  'officer_ids': [1234],
  'crids': [],
  'trr_ids': [],
};

export const skullcapCrewPinboard = {
  'id': 'abcd1234',
  'title': 'Skullcap Crew',
  'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang tactical.',
  'officer_ids': [1234],
  'crids': [],
  'trr_ids': [],
};

export const emptyCreatedPinboard = {
  'id': 'abcd1234',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};
