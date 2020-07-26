import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary'
import PropTypes from 'prop-types';

export default class AddNote extends Component {
    constructor(props){
        super(props);
        this.state={
            noteName: {
                value: '',
                touched: false
            },
            noteContent: {
                value: '',
                touched: false
            }

        }
    }

    updateNoteName(event){
        this.setState({noteName: {value: '', touched: true}})

    }

    validateNoteName() {
        const noteName = this.state.noteName.value.trim();
        if (noteName.length === 0) {
          return 'Folder Name is required';
        } else if (noteName.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    render() {
        const noteNameError = this.validateFolderName();
        return (
            <div>
                <form className="add-folder-form" onSubmit={e => this.handleAddFolderSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="add-folder-hint">* required field</div>  
                <div className="form-group">
                <label htmlFor="folder-name">Folder Name *</label>
                <input type="text" className="folder-name" name="folder-name" id="folder-name" onChange={e => this.props.updateNoteName(e.target.value)} defaultValue="note name" />
                <ErrorBoundary message={noteNameError}/>
                {this.state.folderName.touched && <ErrorBoundary message={this.validateNoteName} />}
                </div>
                </form>
            </div>
        )
    }
}

AddNote.propTypes = {
    folderName: {
        value: PropTypes.string.isRequired
        },
    noteContent: {
        value: PropTypes.string.isRequired
    }
};
