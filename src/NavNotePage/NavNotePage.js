import React from 'react';
import NoteContext from '../NoteContext';
import { findNote, findFolder } from '../noteFunctions';
import PropTypes from 'prop-types';
import './NavNotePage.css';

class NavNotePage extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = NoteContext;

    render() {
        const { noteId } = this.props.match.params;
        const note = findNote(this.context.notes, noteId) || {};
        const folder = findFolder(this.context.folders, note.folder_id);

        return (
            <div className='NavNotePage'>
                <button onClick={() => this.props.history.goBack()} className='goBack'>Go Back</button>
                {folder && (
                    <h3>{folder.name}</h3>
                )}
            </div>
        );
    };
}

NavNotePage.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    })
};

export default NavNotePage;