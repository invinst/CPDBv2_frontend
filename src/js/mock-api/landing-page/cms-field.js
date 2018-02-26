import { RichTextFieldFactory } from 'utils/test/factories/field';

export const getCMSFields = () => (
  {
    fields: [
      RichTextFieldFactory.build({ name: 'navbar_title' }),
      RichTextFieldFactory.build({ name: 'navbar_subtitle' })
    ],
    meta: {}
  }
);
