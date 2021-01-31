import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotePage from './NotePage';

describe(`NotePage Component`, () => {
    it('renders a NotePage by default', () => {
        const wrapper = shallow(<NotePage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    it.skip('renders a Note with a note prop', () => {
        const props = {
            match: {
                params: {
                    noteId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
                }
            }
        };
        const context = {
            notes: [{
                id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
                name: `Dogs`,
                modified: `2019-01-03T00:00:00.000Z`,
                // folderId: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
                content: "Corporis accusamus placeat.\n \rUnde."
            }]
        };
        const note = shallow(<NotePage {...props} />, context)
            .find('Note');
        expect(toJson(note)).toMatchSnapshot();
    });
})