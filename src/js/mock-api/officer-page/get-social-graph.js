const results = {
  '1': {
    nodes: [
      {
        id: 1,
        name: 'Tsumiki Miniwa',
        'cr_years': [
          1992
        ]
      },
      {
        id: 2,
        name: 'Timothy The Bunny',
        'cr_years': [
          null,
          1992,
          1993,
          1995,
          2000,
          2001,
          2002
        ]
      },
      {
        id: 3,
        name: 'John Doe',
        'cr_years': [
          null,
          1992,
          1992,
          1992,
          1992,
          1993,
          1995,
          1995,
          1995,
          1995,
          1995,
          2000,
          2001,
          2001,
          2001,
          2001,
          2001,
          2001,
          2001,
          2002
        ]
      }
    ],
    links: [
      { source: 1, target: 2, 'cr_years': [1992] },
      { source: 2, target: 3, 'cr_years': [2000, 2001] }
    ]
  }
};

export default (offierId=1) => results[`${offierId}`];



