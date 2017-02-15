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
    const startPosition = editorState.getSelection().getStartOffset();
    const endPosition = editorState.getSelection().getEndOffset();
    console.log('%d %d', startPosition, endPosition);

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
