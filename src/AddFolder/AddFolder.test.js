import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddFolder from './AddFolder';

describe(`AddFolder Component`, () => {
    it('renders complete form', () => {
        const wrapper = shallow(<AddFolder />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})