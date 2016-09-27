import * as React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DoubloonCounter from '../../../src/components/board/DoubloonCounter';

function setup(props) {
  return shallow(<DoubloonCounter {...props} />);
}

describe('DoubloonCounter component', function() {
  it('should render correctly', function() {
    const component = setup({
      doubloons: 3
    });

    expect(component.find('span').text()).toBe('Doubloons: 3');
  });
});
