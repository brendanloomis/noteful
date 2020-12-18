import React from 'react';
import Note from '../Note/Note';
import './NotePage.css';

class NotePage extends React.Component {
    render() {
        return (
            <div className='NotePage'>
                <Note 
                    id={this.props.note.id}
                    name={this.props.note.name}
                    modified={this.props.note.modified}
                />
                <div className='NotePage_content'>
                    <p>{this.props.note.content}</p>
                </div>
            </div>
        );
    };
}

export default NotePage;