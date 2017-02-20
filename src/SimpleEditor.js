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
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    if (contentState !== prevState.editorState.getCurrentContent()) {
      console.log('%c Content changed', 'color: orange; font-weight: bold;');
    }

    if (selectionState !== prevState.editorState.getSelection()) {
      console.log('%c Selection changed', 'color: red; font-weight: bold;');
    }
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
