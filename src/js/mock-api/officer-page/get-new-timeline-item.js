const timelineItems = [
  {
    'unit_name': '007',
    kind: 'AWARD',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2006-03-01',
    'award_type': 'Honorable Mention'
  },
  {
    'trr_id': 1,
    'unit_name': '007',
    kind: 'FORCE',
    taser: true,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-12-17',
    'firearm_used': false
  },
  {
    'trr_id': 2,
    'unit_name': '007',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-03-17',
    'firearm_used': false
  },
  {
    'unit_name': '007',
    kind: 'UNIT_CHANGE',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-01-07'
  },
  {
    'trr_id': 3,
    'unit_name': '153',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2004-12-17',
    'firearm_used': true
  },
  {
    category: 'Illegal Search',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Search Of Premise Without Warrant',
    crid: '294088',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-11-26',
    coaccused: 8,
    finding: 'Exonerated',
    outcome: 'No Action Taken',
    attachments: [
      {
        url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
        'preview_image_url':
          'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
        title: 'CRID 294088 CR'
      }
    ]
  },
  {
    category: 'Criminal Misconduct',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Theft',
    crid: '260131',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-02-17',
    coaccused: 4,
    finding: 'Unfounded',
    outcome: 'No Action Taken'
  },
  {
    'unit_name': '153',
    kind: 'UNIT_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28'
  },
  {
    'unit_name': '044',
    kind: 'JOINED',
    'unit_description': 'Recruit Training Section',
    rank: 'Police Officer',
    date: '2000-02-05'
  }
];

const results = {
  '1': timelineItems,
  '1234': []
};

export default (officerId = 1) => results[`${officerId}`];
