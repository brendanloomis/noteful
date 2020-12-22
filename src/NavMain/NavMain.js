import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import './NavMain.css';

class NavMain extends React.Component {
    static contextType = NoteContext;
    
    render() {
        const folders = this.context.folders.map(folder => (
            <li key={folder.id}>
                <NavLink 
                    to={`/folder/${folder.id}`}
                    className='NavMain_folder'>
                    {folder.name}
                </NavLink>
            </li>
        ));
        return (
            <div className='NavMain'>
                <ul>
                    {folders}
                </ul>
                <Link to='/add-folder' class='addFolderLink'>
                    <button className='addFolder'>Add Folder</button>
                </Link>
            </div>
        );
    }
}

NavMain.defaultProps = {
    folders: []
}

export default NavMain;