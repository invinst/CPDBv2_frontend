import draftJs from 'draft-js';
import moment from 'moment';
import should from 'should';
import { stub } from 'sinon';

import {
  contentStateToTextArray, convertContentStateToEditorState, getField, multilineTextValueToArray,
  plainTextValueToString, createBlock, createEmptyEditorState, hasSelection,
  createFieldWithEmptyEditorState, createEmptyStringField, createEmptyDateField, removeSelection,
  getFieldOrCreateEmptyWithEditorState, linkEntitySelected, createLinkEntity, removeLinkEntity,
  inlineStyleSelected, defocus, getSelectionStartBlockKey,
  editorStateToText, convertEditorStateToRaw
} from 'utils/draft';
import { ENTITY_LINK } from 'utils/constants';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import defaultDecorator from 'decorators';


describe('Draft utils', function () {
  beforeEach(function () {
    stub(draftJs, 'genKey').returns('abc12');
  });

  afterEach(function () {
    draftJs.genKey.restore();
  });

  describe('contentStateToTextArray', function () {
    it('should return empty array if contentState is falsy', function () {
      contentStateToTextArray(false).should.eql([]);
      contentStateToTextArray({ isEmpty: () => true }).should.eql([]);
    });

    it('should return block text array', function () {
      contentStateToTextArray({
        getBlocksAsArray: () => [
          { getText: () => 'a' },
          { getText: () => 'b' }
        ],
        isEmpty: () => false
      }).should.eql(['a', 'b']);
    });
  });

  describe('convertContentStateToEditorState', function () {
    it('should create empty editor state if given empty content state', function () {
      const editorState = convertContentStateToEditorState(null);
      editorState.getCurrentContent().hasText().should.be.false();
      editorState.getDecorator().should.eql(defaultDecorator);
    });

    it('should create editor state from given content state', function () {
      const editorState = convertContentStateToEditorState(RawContentStateFactory.build({}, { blockTexts: ['a'] }));
      editorState.getCurrentContent().getFirstBlock().getText().should.eql('a');
      editorState.getDecorator().should.eql(defaultDecorator);
    });
  });

  describe('getField', function () {
    it('should return field given name', function () {
      getField([
        { name: 'a', value: 1 },
        { name: 'b', value: 2 }
      ], 'a').value.should.eql(1);
    });
  });

  describe('multilineTextValueToArray', function () {
    it('should return block texts as array of strings', function () {
      multilineTextValueToArray(RawContentStateFactory.build({}, { blockTexts: ['c', 'd'] }))
        .should.eql(['c', 'd']);
    });
  });

  describe('plainTextValueToString', function () {
    it('should return block text as a single string', function () {
      plainTextValueToString(RawContentStateFactory.build({}, { blockTexts: ['e'] }))
        .should.eql('e');
    });
  });

  describe('createBlock', function () {
    it('should return block give text string', function () {
      const block = createBlock('abc');
      block.should.containEql({
        data: {},
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
        type: 'unstyled',
        text: 'abc'
      });
      block.key.should.not.undefined();
    });
  });

  describe('createEmptyEditorState', function () {
    it('should create empty raw content state', function () {
      createEmptyEditorState().should.eql(
        {
          entityMap: {},
          blocks: [
            {
              text: '',
              entityRanges: [],
              depth: 0,
              key: 'abc12',
              type: 'unstyled',
              inlineStyleRanges: [],
              data: {}
            }
          ]
        }
      );
    });
  });

  describe('createFieldWithEmptyEditorState', function () {
    it('should create field with empty editor state', function () {
      createFieldWithEmptyEditorState('a', 'b').should.eql({
        name: 'a',
        type: 'b',
        value: {
          entityMap: {},
          blocks: [
            {
              text: '',
              entityRanges: [],
              depth: 0,
              key: 'abc12',
              type: 'unstyled',
              inlineStyleRanges: [],
              data: {}
            }
          ]
        }
      });
    });
  });

  describe('createEmptyStringField', function () {
    it('should create field with empty string', function () {
      createEmptyStringField('c').should.eql({
        name: 'c',
        type: 'string',
        value: ''
      });
      createEmptyStringField('d', 'link').should.eql({
        name: 'd',
        type: 'link',
        value: ''
      });
    });
  });

  describe('createEmptyDateField', function () {
    it('should create empty date field', function () {
      createEmptyDateField('e').should.eql({
        name: 'e',
        type: 'date',
        value: moment().format('YYYY-MM-DD')
      });
    });
  });

  describe('getFieldOrCreateEmptyWithEditorState', function () {
    it('should create empty field if not found', function () {
      getFieldOrCreateEmptyWithEditorState([
        { name: 'a' }
      ], 'b', 'c').should.eql({
        name: 'b',
        type: 'c',
        value: {
          entityMap: {},
          blocks: [
            {
              text: '',
              entityRanges: [],
              depth: 0,
              key: 'abc12',
              type: 'unstyled',
              inlineStyleRanges: [],
              data: {}
            }
          ]
        }
      });
    });

    it('should get field if exists', function () {
      getFieldOrCreateEmptyWithEditorState([
        { name: 'a', type: 'b', value: 'c' }
      ], 'a', 'b').should.eql({
        name: 'a',
        type: 'b',
        value: 'c'
      });
    });
  });

  describe('linkEntitySelected', function () {
    it('should return entity if a link entity is selected', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      const entityKey = draftJs.Entity.create(ENTITY_LINK, 'MUTABLE', { url: 'http://example.com' });
      editorState = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      linkEntitySelected(editorState).should.be.ok();
    });

    it('should return null if no link entity is selected', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let editorState = draftJs.EditorState.createWithContent(contentState);
      should(linkEntitySelected(editorState)).not.be.ok();
    });
  });

  describe('inlineStyleSelected', function () {
    it('should return current inline style', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      inlineStyleSelected(editorState, 'BOLD').should.be.false();
      editorState = draftJs.RichUtils.toggleInlineStyle(editorState, 'BOLD');
      inlineStyleSelected(editorState, 'BOLD').should.be.true();
    });
  });

  describe('createLinkEntity', function () {
    it('should create link entity', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      editorState = createLinkEntity(editorState, { url: 'http://example.com' });
      const contentBlock = editorState.getCurrentContent().getFirstBlock();
      contentBlock.getEntityAt(1).should.be.ok();
    });
  });

  describe('removeLinkEntity', function () {
    it('should remove link entity', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      const entityKey = draftJs.Entity.create(ENTITY_LINK, 'MUTABLE', { url: 'http://example.com' });
      editorState = draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      editorState = removeLinkEntity(editorState);
      const contentBlock = editorState.getCurrentContent().getFirstBlock();
      should.not.exist(contentBlock.getEntityAt(1));
    });
  });

  describe('removeSelection', function () {
    it('should deselect', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      editorState = removeSelection(editorState);
      selectionState = editorState.getSelection();
      selectionState.getAnchorKey().should.eql(selectionState.getFocusKey());
      selectionState.getAnchorOffset().should.eql(selectionState.getFocusOffset());
    });
  });

  describe('hasSelection', function () {
    it('should return true if selection is not empty', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('anchorOffset', 1).set('focusOffset', 2);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);
      hasSelection(editorState).should.be.true();
    });

    it('should return false if selection is empty', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let editorState = draftJs.EditorState.createWithContent(contentState);
      hasSelection(editorState).should.be.false();
    });
  });

  describe('defocus', function () {
    it('should defocus editorstate', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      selectionState = selectionState.set('hasFocus', true);
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

      editorState = defocus(editorState);
      selectionState = editorState.getSelection();
      selectionState.getHasFocus().should.be.false();
    });
  });

  describe('getSelectionStartBlockKey', function () {
    it('should return start key of selection', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      let selectionState = draftJs.SelectionState.createEmpty(contentState.getFirstBlock().getKey());
      let editorState = draftJs.EditorState.createWithContent(contentState);
      editorState = draftJs.EditorState.acceptSelection(editorState, selectionState);

      getSelectionStartBlockKey(editorState).should.eql(selectionState.getStartKey());
    });
  });

  describe('editorStateToText', function () {
    it('should return text from editor state', function () {
      const contentState = draftJs.ContentState.createFromText('multiple line\ntext');
      const editorState = draftJs.EditorState.createWithContent(contentState);
      editorStateToText(editorState).should.equal('multiple line text');
    });
  });

  describe('convertEditorStateToRaw', function () {
    it('should return raw content state from editor state', function () {
      const contentState = draftJs.ContentState.createFromText('abc');
      const editorState = draftJs.EditorState.createWithContent(contentState);
      convertEditorStateToRaw(editorState).should.eql({
        blocks: [
          {
            data: {},
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
            key: contentState.getFirstBlock().getKey(),
            text: 'abc',
            type: 'unstyled'
          }
        ],
        entityMap: {}
      });
    });
  });
});
