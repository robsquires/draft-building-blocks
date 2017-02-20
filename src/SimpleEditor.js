import React from 'react';
import {Editor, EditorState, ContentState, CharacterMetadata} from 'draft-js';
import {Panel, Button} from 'react-bootstrap';
import './SimpleEditor.css'
import content from './content'

/**
 * inline style map
 */
const styleMap = {
  'HIGHLIGHT': {
    backgroundColor: 'rgb(141, 218, 165)',
  },
};


class SimpleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.highlight = this.highlight.bind(this);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(content)
      ),
      selectedText: ''
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

  render() {
    return (
      <div>
        <Panel>
          <Editor
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

      </div>
    );
  }
}

export default SimpleEditor;
