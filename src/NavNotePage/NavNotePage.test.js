import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavNotePage from './NavNotePage';

describe(`NavNotePage Component`, () => {
    it('renders a NavNotePage by default', () => {
        const wrapper = shallow(<NavNotePage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it.skip('renders an h3 with folder name when in props', () => {
        const props = {
            match: {
                params: {
                    noteId: 'test-note-id'
                }
            }
        };
        const context = {
            notes: [{ id: 'test-note-id', folderId: 'test-folder-id' }],
            folders: [{ id: 'test-folder-id', name: 'Important' }]
        };
        const h3 = shallow(<NavNotePage {...props} />, context)
            .find(h3);
        expect(toJson(h3)).toMatchSnapshot();
    });
})