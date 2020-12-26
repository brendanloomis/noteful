import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../noteFunctions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NoteList.css';

class NoteList extends React.Component {
    static contextType = NoteContext;

    render() {
        const { folderId } = this.props.match.params;
        const notesForFolder = getNotesForFolder(this.context.notes, folderId)
        const notes = notesForFolder.map(note => (
            <li key={note.id}>
                <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
            </li>
        ));

        return (
            <div className='NoteList'>
                <ul>
                    {notes}
                </ul>
                <div>
                    <Link to='/add-note' class='addNoteLink'>
                    <button className='addNote'>Add Note</button>
                    </Link>
                </div>
            </div>
        );
    };
}

NoteList.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default NoteList;