export const toastsData = [
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

export const appConfigData = {
  'VISUAL_TOKEN_COLORS': [
    { 'lower_range': 0, 'upper_range': 5, 'color': '#F5F4F4', 'text_color': '#ADADAD' },
    { 'lower_range': 5, 'upper_range': 30, 'color': '#F9D3C3', 'text_color': '#ADADAD' },
    { 'lower_range': 30, 'upper_range': 50, 'color': '#F4A298', 'text_color': '#ADADAD' },
    { 'lower_range': 50, 'upper_range': 70, 'color': '#FF6453', 'text_color': '#ADADAD' },
    { 'lower_range': 70, 'upper_range': 90, 'color': '#FF412C', 'text_color': '#ADADAD' },
    { 'lower_range': 90, 'upper_range': 100, 'color': '#F52524', 'text_color': '#ADADAD' },
  ],
  'PINBOARD_INTRODUCTION_DELAY': '2000',
};
