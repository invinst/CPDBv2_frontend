export const getToasts = () => [
  {
    name: 'OFFICER',
    template: '**{rank} {full_name}** {age} {race} {gender},' +
      '\nwith *{complaint_count} complaints*, *{sustained_count} sustained* {action_type}.',
  },
  {
    name: 'CR',
    template: '**CR #{crid}** *categorized as {category}*\nhappened in {incident_date} {action_type}.',
  },
  {
    name: 'TRR',
    template: '**TRR #{id}** *categorized as {force_type}*\nhappened in {incident_date} {action_type}.',
  },
];
