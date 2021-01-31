import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNote from './AddNote';

describe(`AddNote Component`, () => {
    it('renders complete form', () => {
        const wrapper = shallow(<AddNote />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})