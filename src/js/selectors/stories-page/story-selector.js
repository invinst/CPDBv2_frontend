import moment from 'moment';

import { getContentStateFromFields } from 'utils/draft';


const plainTextValueToString = plainTextValue => (
  plainTextValue.blocks[0].text
);

export default story => {
  return {
    id: story.id,
    title: plainTextValueToString(
      getContentStateFromFields(story.fields, 'title').value
    ),
    publicationName: getContentStateFromFields(story.fields, 'publication').value,
    publishDate: moment(
      getContentStateFromFields(story.fields, 'publish_date').value
    ).format('ll')
  };
};
