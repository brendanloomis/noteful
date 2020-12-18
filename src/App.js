import React from 'react';
import { Route, Link } from 'react-router-dom';
import dummyStore from './dummy-store';
import NavMain from './NavMain/NavMain';
import NoteList from './NoteList/NoteList';
import NavNotePage from './NavNotePage/NavNotePage';
import NotePage from './NotePage/NotePage';
import './App.css';

class App extends React.Component{
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    this.setState(dummyStore);
  }

  getNotesForFolder(notes, folderId) {
    return (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    );
  }

  findFolder(folders, folderId) {
    return (
      folders.find(folder => folder.id === folderId)
    );
  }

  findNote(notes, noteId) {
    return (
      notes.find(note => note.id === noteId)
    );
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NavMain 
                folders={this.state.folders}
                notes={this.state.notes}
              />
            )}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = this.findNote(this.state.notes, noteId) || {};
            const folder = this.findFolder(this.state.folders, note.folderId);
            return <NavNotePage {...routeProps} folder={folder} />
          }}
        />
        <Route path='/add-folder' component={NavNotePage} />
        <Route path='/add-note' component={NavNotePage} /> 
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = this.getNotesForFolder(
                this.state.notes,
                folderId
              );
              return (
                <NoteList
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = this.findNote(this.state.notes, noteId);
            return <NotePage {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
      <div className='App'>
        <header>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <nav className='nav'>{this.renderNavRoutes()}</nav>
        <main className='main'>{this.renderMainRoutes()}</main>
      </div>
    );
  };
}

export default App;