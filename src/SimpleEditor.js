import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import {Panel} from 'react-bootstrap';
import './SimpleEditor.css'
import content from './content'

class SimpleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(content)
      )
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const editorState = this.state.editorState
    // const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const startOffset = selectionState.getStartOffset();
    const endOffset = selectionState.getEndOffset();

    console.log(
      '%c %d %c %d',
      'color: blue; font-weight: bold;',
      startOffset,
      'color: red; font-weight: bold;',
      endOffset
    )
  }

  onChange(editorState) {
    this.setState({ editorState });
  }


  render() {
    return (
        <Panel>

          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />

        </Panel>
    );
  }
}

export default SimpleEditor;
