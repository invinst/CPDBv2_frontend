const officers = [
  {
    'full_name': 'Glenn Evans',
    id: 8138,
    'percentile': {
      'percentile_allegation_civilian': '4.4000',
      'percentile_allegation_internal': '5.5000',
      'percentile_trr': '6.6000'
    }
  },
  {
    'full_name': 'Isaac Lee',
    id: 15956,
    'percentile': {
      'percentile_allegation_civilian': '7.7000',
      'percentile_allegation_internal': '8.8000',
      'percentile_trr': '9.9000'
    }
  },
  {
    'full_name': 'Thomas Kampenga',
    id: 14045,
    'percentile': {
      'percentile_allegation_civilian': '10.10000',
      'percentile_allegation_internal': '11.1100',
      'percentile_trr': '12.1200'
    }
  },
  {
    'full_name': 'Melvin Ector',
    id: 31945,
    'percentile': {
      'percentile_allegation_civilian': '13.1300',
      'percentile_allegation_internal': '14.1400',
      'percentile_trr': '15.1500'
    }
  },
  {
    'full_name': 'Sean Brandon',
    id: 2671,
    'percentile': {
      'percentile_allegation_civilian': '16.1600',
      'percentile_allegation_internal': '17.1700',
      'percentile_trr': '18.1800'
    }
  },
  {
    'full_name': 'Estella Perez-Stanford',
    id: 22297,
    'percentile': {
      'percentile_allegation_civilian': '19.1900',
      'percentile_allegation_internal': '20.2000',
      'percentile_trr': '21.2100'
    }
  },
  {
    'full_name': 'Johnny Cavers',
    id: 4269,
    'percentile': {
      'percentile_allegation_civilian': '22.2200',
      'percentile_allegation_internal': '23.2300',
      'percentile_trr': '24.2400'
    }
  },
  {
    'full_name': 'Gilbert Cobb',
    id: 4881,
    'percentile': {
      'percentile_allegation_civilian': '25.2500',
      'percentile_allegation_internal': '26.2600',
      'percentile_trr': '27.2700'
    }
  },
  {
    'full_name': 'John Hart',
    id: 11580,
    'percentile': {
      'percentile_allegation_civilian': '28.2800',
      'percentile_allegation_internal': '29.2900',
      'percentile_trr': '30.3000'
    }
  },
  {
    'full_name': 'William Roberison',
    id: 24157,
    'percentile': {
      'percentile_allegation_civilian': '31.3100',
      'percentile_allegation_internal': '32.3200',
      'percentile_trr': '33.3300'
    }
  },
  {
    'full_name': 'Francis Higgins',
    id: 12176,
    'percentile': {
      'percentile_allegation_civilian': '34.3400',
      'percentile_allegation_internal': '35.3500',
      'percentile_trr': '36.3600'
    }
  },
  {
    'full_name': 'David Portis',
    id: 22861,
    'percentile': {
      'percentile_allegation_civilian': '37.3700',
      'percentile_allegation_internal': '38.3800',
      'percentile_trr': '39.3900'
    }
  },
  {
    'full_name': 'Eugene Offett',
    id: 21194,
    'percentile': {
      'percentile_allegation_civilian': '40.4000',
      'percentile_allegation_internal': '41.4100',
      'percentile_trr': '42.4200'
    }
  },
  {
    'full_name': 'Joseph Blaye',
    id: 2171,
    'percentile': {
      'percentile_allegation_civilian': '43.4300',
      'percentile_allegation_internal': '44.4400',
      'percentile_trr': '45.4500'
    }
  },
  {
    'full_name': 'Charles Toussas',
    id: 28805,
    'percentile': {
      'percentile_allegation_civilian': '46.4600',
      'percentile_allegation_internal': '47.4700',
      'percentile_trr': '48.4800'
    }
  },
  {
    'full_name': 'Bennie Watson',
    id: 30209,
    'percentile': {
      'percentile_allegation_civilian': '49.4900',
      'percentile_allegation_internal': '50.5000',
      'percentile_trr': '51.5100'
    }
  },
  {
    'full_name': 'Tracy Hughes',
    id: 12737,
    'percentile': {
      'percentile_allegation_civilian': '52.5200',
      'percentile_allegation_internal': '53.5300',
      'percentile_trr': '54.5400'
    }
  },
  {
    'full_name': 'Donnell Calhoun',
    id: 3663,
    'percentile': {
      'percentile_allegation_civilian': '55.5500',
      'percentile_allegation_internal': '56.5600',
      'percentile_trr': '57.5700'
    }
  },
  {
    'full_name': 'Hardy White',
    id: 30466,
    'percentile': {
      'percentile_allegation_civilian': '58.5800',
      'percentile_allegation_internal': '59.5900',
      'percentile_trr': '60.6000'
    }
  },
  {
    'full_name': 'Matthew Brandon',
    id: 2675,
    'percentile': {
      'percentile_allegation_civilian': '61.6100',
      'percentile_allegation_internal': '62.6200',
      'percentile_trr': '63.6300'
    }
  },
];
const defaultCoaccusedData = [
  { 'officer_id_1': 2675, 'officer_id_2': 24157, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 22861, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 4269, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30466, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30209, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30209, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 12176, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 14045, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 3663, 'officer_id_2': 8138, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 8138, 'officer_id_2': 30466, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 12176, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 4881, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4881, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4881, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4881, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 4881, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 6 }
];
const defaultListEvent = [
  '1990-01-09',
  '1992-03-08',
  '1994-01-10',
  '1994-03-07',
  '1994-03-12',
  '1994-04-17',
  '1998-11-17',
  '1999-02-08',
  '1999-07-22',
  '2006-03-15',
  '2008-01-11'
];
const allComplaintCoaccusedData = [
  { 'officer_id_1': 2675, 'officer_id_2': 24157, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 22861, 'officer_id_2': 30466, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1990-01-09T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 11580, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 22861, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 22297, 'incident_date': '1992-07-18T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 4269, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 30209, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30466, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30209, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 30209, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 12176, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 14045, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 3663, 'officer_id_2': 8138, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 8138, 'officer_id_2': 30466, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 12176, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 4881, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4881, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4881, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4881, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 4881, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 21194, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 4269, 'officer_id_2': 21194, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 2 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 6 }
];
const allComplaintListEvent = [
  '1990-01-09',
  '1992-03-08',
  '1992-07-18',
  '1994-01-10',
  '1994-03-07',
  '1994-03-12',
  '1994-04-17',
  '1998-11-17',
  '1999-02-08',
  '1999-07-22',
  '2006-03-15',
  '2008-01-11'
];
const thresholdThreeCoaccusedData = [
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1992-03-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-01-10T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1994-03-07T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '1994-03-12T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1994-04-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 12176, 'officer_id_2': 14045, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 11580, 'officer_id_2': 30466, 'incident_date': '1998-11-17T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 14045, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 12176, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 21194, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 8 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 14045, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-02-08T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 21194, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '1999-07-22T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 6 },
  { 'officer_id_1': 8138, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 4 },
  { 'officer_id_1': 4269, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 3663, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 4269, 'officer_id_2': 31945, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2006-03-15T00:00:00Z', 'accussed_count': 5 },
  { 'officer_id_1': 3663, 'officer_id_2': 28805, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 7 },
  { 'officer_id_1': 3663, 'officer_id_2': 4269, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 3 },
  { 'officer_id_1': 2671, 'officer_id_2': 15956, 'incident_date': '2008-01-11T00:00:00Z', 'accussed_count': 6 }
];
const thresholdThreeListEvent = [
  '1992-03-08',
  '1994-01-10',
  '1994-03-07',
  '1994-03-12',
  '1994-04-17',
  '1998-11-17',
  '1999-02-08',
  '1999-07-22',
  '2006-03-15',
  '2008-01-11'
];

export const getDefaultSocialGraphData = () => ({
  'officers': officers,
  'coaccused_data': defaultCoaccusedData,
  'list_event': defaultListEvent,
});

export const getOfficerComplaintSocialGraphData = () => ({
  'officers': officers,
  'coaccused_data': allComplaintCoaccusedData,
  'list_event': allComplaintListEvent,
});

export const getThresholdThreeSocialGraphData = () => ({
  'officers': officers,
  'coaccused_data': thresholdThreeCoaccusedData,
  'list_event': thresholdThreeListEvent,
});
