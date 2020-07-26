import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary'
import PropTypes from 'prop-types';
import '../App/App.css'; 

export default class AddNote extends Component {
    constructor(props){
        super(props);
        this.state={
            noteTitle: {
                value: '',
                touched: false
            },
            noteContent: {
                value: '',
                touched: false
            }

        }
    }

    updateNoteTitle(event){
        this.setState({noteTitle: {value: '', touched: true}})

    }

    updateNoteContent(event){
        this.setState({noteContent: {value: '', touched: true}})

    }

    validateNoteTitle() {
        const noteTitle = this.state.noteTitle.value.trim();
        if (noteTitle.length === 0) {
          return 'note Title is required';
        } else if (noteTitle.length < 3) {
          return 'Title must be at least 3 characters long';
        }
      }

      validateNoteContent() {
        const noteContent = this.state.noteContent.value.trim();
        if (noteContent.length === 0) {
          return 'note Content is required';
        } else if (noteContent.length < 3) {
          return 'At least write more than one word';
        }
      }

    render() {
        const noteTitleError = this.validateNoteTitle();
        const noteContentError = this.validateNoteContent();
        return (
            <div>
                <form className="add-note-form" onSubmit={e => this.handleAddNoteSubmit(e)}>
                <h2>Add Note</h2>

                <div className="add-note-hint">* required field</div>

                <div className="form-group">

                <label htmlFor="note-title"> Title *</label>
                <input type="text" className="note-title" name="note-title" id="note-title" onChange={e => this.updateNoteTitle(e.target.value)} />
                
                <ErrorBoundary message={noteTitleError}/>
                {this.state.noteTitle.touched && <ErrorBoundary message={this.validateTitleName} />}
                </div>

                <div className="form-group">

                <label htmlFor="note-content"> Content *</label>
                <input type="text" className="note-content" name="note-content" id="note-content" onChange={e => this.updateNoteContent(e.target.value)} />
                
                <ErrorBoundary message={noteContentError}/>
                {this.state.noteTitle.touched && <ErrorBoundary message={this.validateTitleName} />}
                </div>

                <div className='save-and-cancel-buttons'>
                <button type='button' onClick={this.handleClickCancel}> Cancel </button>
                {' '}
                <button type='submit'> Save </button>
                </div>
              
                </form>
            </div>
        )
    }
}

AddNote.propTypes = {
    noteTitle: PropTypes.string.isRequired,
    noteContent: PropTypes.string.isRequired
    };
