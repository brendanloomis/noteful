import React from 'react';
import { Route, Link } from 'react-router-dom';
import NavMain from './NavMain/NavMain';
import NoteList from './NoteList/NoteList';
import NavNotePage from './NavNotePage/NavNotePage';
import NotePage from './NotePage/NotePage';
import NoteContext from './NoteContext';
import config from './config';
import './App.css';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends React.Component{
  state = {
    notes: [],
    folders: []
  };

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    });
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    });
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([noteRes, folderRes]) => {
        if(!noteRes.ok) {
          return noteRes.json().then(error => {
            throw error;
          })
        };
        if(!folderRes.ok) {
          return folderRes.json().then(error => {
            throw error;
          })
        }
        return Promise.all([noteRes.json(), folderRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(err => {
        console.error({err});
      });
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  }

  renderNavRoutes() {
    return (
      <>
        <ErrorBoundary>
          {['/', '/folder/:folderId'].map(path => (
            <Route 
              exact
              key={path}
              path={path}
              component={NavMain}
            />
          ))}
        </ErrorBoundary>
        <ErrorBoundary>
          <Route 
            path='/note/:noteId'
            component={NavNotePage}
          />
        </ErrorBoundary>
          <Route 
            path='/add-folder' 
            component={NavNotePage} 
          />
        <Route 
          path='/add-note' 
          component={NavNotePage}
        /> 
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        <ErrorBoundary>
          {['/', '/folder/:folderId'].map(path => (
            <Route 
              exact
              key={path}
              path={path}
              component={NoteList}
            />
          ))}
        </ErrorBoundary>
        <ErrorBoundary>
          <Route 
            path='/note/:noteId'
            component={NotePage}
          />
        </ErrorBoundary>
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    );
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
      <NoteContext.Provider value={contextValue}>
        <div className='App'>
          <header>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <nav className='nav'>{this.renderNavRoutes()}</nav>
          <main className='main'>{this.renderMainRoutes()}</main>
        </div>
      </NoteContext.Provider>
    );
  };
}

export default App;