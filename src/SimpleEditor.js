import React from 'react';
import {Editor, EditorState} from 'draft-js';
import {Panel} from 'react-bootstrap';
import './SimpleEditor.css'

class SimpleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }


  onChange(editorState) {
    const selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const anchorKey = selectionState.getAnchorKey();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    console.log(selectedText);

    this.setState({ editorState });
  }


  render() {
    return (
        <Panel footer="Cursor position">

          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />

        </Panel>
    );
  }
}

export default SimpleEditor;
