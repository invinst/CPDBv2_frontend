import { RichTextFieldFactory } from 'utils/test/factories/field';


export const landingPageCMSFields = {
  fields: [
    RichTextFieldFactory.build({ name: 'navbar_title' }),
    RichTextFieldFactory.build({ name: 'navbar_subtitle' })
  ],
  meta: {}
};

export const officerPageCMSFields = {
  fields: [
    RichTextFieldFactory.build({ name: 'triangle_description' }, { blockTexts: ['triangle description'] }),
    RichTextFieldFactory.build({ name: 'triangle_sub_description' }, { blockTexts: ['triangle sub description'] }),
    RichTextFieldFactory.build({ name: 'scale_description' }, { blockTexts: ['scale description'] }),
    RichTextFieldFactory.build({ name: 'scale_sub_description' }, { blockTexts: ['scale sub description'] }),
    RichTextFieldFactory.build({ name: 'no_data_explain_text' }, { blockTexts: ['no data explain text'] }),
  ],
  meta: {}
};
