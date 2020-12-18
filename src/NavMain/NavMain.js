import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMain.css';

class NavMain extends React.Component {
    render() {
        const folders = this.props.folders.map(folder => (
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
                <button className='addFolder'>Add Folder</button>
            </div>
        );
    }
}

NavMain.defaultProps = {
    folders: []
}

export default NavMain;