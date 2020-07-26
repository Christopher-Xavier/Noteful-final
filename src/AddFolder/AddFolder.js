import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary'
import PropTypes from 'prop-types';
import '../App/App.css';
import config from '../config'
export default class AddFolder extends Component {
    constructor(props){
        super(props);
        this.state={
            folderName: {
                value: '',
                touched: false
            }
        }
    }

    updateFolderName(event){
        this.setState({folderName: {value: '', touched: true}})

    }

    validateFolderName() {
        const folderName = this.state.folderName.value.trim();
        if (folderName.length === 0) {
          return 'Folder Name is required';
        } else if (folderName.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

      handleAddFolderSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const { folderName } = e.target
        const folder = {
          folderName: folderName.value
        }
        this.setState({ error: null })
        fetch(config.API_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(folder),
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${config.API_KEY}`
          }
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
            return res.json()
          })
          .then(data => {
            this.folderName.value = ''
            this.context.addFolder(data)
            this.props.history.push('/')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }
    
      handleClickCancel = () => {
        this.props.history.push('/')
      };

    render() {
        const folderNameError = this.validateFolderName();
        return (
            <div>
              <form className="add-folder-form" onSubmit={e => this.handleAddFolderSubmit(e)}>
                <h2>Add Folder</h2>

                <div className="add-folder-hint">* required field</div>

                <div className="form-group">

                <label htmlFor="folder-name">Folder Name *</label>
                <input type="text" className="folder-name" name="folder-name" id="folder-name" onChange={e => this.updateFolderName(e.target.value)} defaultValue="Untitled" />

                <ErrorBoundary message={folderNameError}/>
                {this.state.folderName.touched && <ErrorBoundary message={this.validateFolderName} />}
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

// AddFolder.propTypes = {
//   folderName: {
//       value: PropTypes.string.isRequired}
// };

AddFolder.propTypes = {
  value: PropTypes.string.isRequired
};

  