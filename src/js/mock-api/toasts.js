export const getToasts = () => [
  {
    name: 'OFFICER',
    template: '**{rank} {full_name}** {age} {race} {gender}, ' +
      'with *{complaint_count} complaints*, *{sustained_count} sustained* {action_type}.',
  },
  {
    name: 'CR',
    template: '**CR #{crid}** *categorized as {category}* happened in {incident_date} {action_type}.',
  },
  {
    name: 'TRR',
    template: '**TRR #{id}** *categorized as {force_type}* happened in {incident_date} {action_type}.',
  },
];
