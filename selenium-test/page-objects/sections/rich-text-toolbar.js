import Section from './section';


class RichTextToolbar extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      element: '.test--rich-text-toolbar',
      boldButton: '.test--rich-text-bold',
      italicButton: '.test--rich-text-italic',
      linkButton: '.test--rich-text-link',
      urlInput: '.test--toolbar-url-input'
    });
  }
}

module.exports = RichTextToolbar;
