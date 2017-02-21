import React from 'react';

import {Editor, EditorState, ContentState, CharacterMetadata, RichUtils, CompositeDecorator, convertToRaw} from 'draft-js';

import {Panel, Button} from 'react-bootstrap';
import './SimpleEditor.css';
import content from './content';
import JSONPretty from 'react-json-pretty';

import Stock from './Stock';

/**
 * inline style map
 */
const styleMap = {
  'HIGHLIGHT': {
    backgroundColor: 'rgb(141, 218, 165)',
  },
};

const findStockEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'STOCK'
      );
    },
    callback
  );
};

class SimpleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.highlight = this.highlight.bind(this);
    this.addStockPrice = this.addStockPrice.bind(this);
    this.save = this.save.bind(this);

    const decorator = new CompositeDecorator([
      {
        strategy: findStockEntities,
        component: Stock,
      },
    ]);


    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(content),
        decorator,
      ),
      selectedText: '',
      rawContent: null
    };
  }

  onChange(editorState) {
    this.setState({ editorState });
  }


  highlight() {
    const editorState = this.state.editorState
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // extract the text between the start and end
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();

    // get contentBlock where the 'cursor' is
    const blockKey = selectionState.getAnchorKey();

    // update the content block where the cursor is
    const updatedBlockMap = contentState.getBlockMap().update(blockKey, contentBlock => {
      // apply the style to the characters where the highlight is
      const updatedCharacterList = contentBlock.getCharacterList().map((char, idx) => {
        if (idx < start || idx >= end) {
          return char;
        }
        return CharacterMetadata.applyStyle(char, 'HIGHLIGHT');
      })

      // set the new character list against the content block
      return contentBlock.set('characterList', updatedCharacterList);
    })

    const updatedContentState = contentState.set('blockMap', updatedBlockMap)

    this.setState({
      editorState: EditorState.push(editorState, updatedContentState)
    })

  }


  addStockPrice() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();

      const stockSymbol = window.prompt('Enter stock symbol');

      const contentStateWithEntity = contentState.createEntity(
        'STOCK',
        'MUTABLE',
        { symbol: stockSymbol, price: (Math.random() * 100).toFixed(2) }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState, { currentContent: contentStateWithEntity }
      );
      this.setState({
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
      }, () => {
        setTimeout(() => this.editor.focus(), 0);
      });
    }
  }

  save() {
    const contentState = this.state.editorState.getCurrentContent()
    this.setState({
      rawContent: convertToRaw(contentState)
    })
  }

  render() {
    return (
      <div>
        <Panel>
          <Editor
            ref={e => this.editor = e}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </Panel>

        <Button
          bsStyle="success"
          bsSize="xsmall"
          onClick={this.highlight}>
          Highlight
        </Button>


        <Button
          bsStyle="primary"
          bsSize="xsmall"
          onClick={this.addStockPrice}>
          Add Stock Price
        </Button>

        <Button
          bsStyle="warning"
          bsSize="xsmall"
          onClick={this.save}>
          Save
        </Button>

        { this.state.rawContent &&
          <JSONPretty
            id="json-pretty"
            json={this.state.rawContent}
            style={{ marginTop: '30px' }}
          />
        }
      </div>
    );
  }
}

export default SimpleEditor;
