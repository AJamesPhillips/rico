import * as React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import { createSpy } from 'expect';
import chaiEnzyme from 'chai-enzyme';
import RemoveColonist from '../../../src/components/colonists/RemoveColonist';

chai.use(chaiEnzyme());

function setup(props) {
  return shallow(<RemoveColonist {...props} />);
}

describe('<RemoveColonist>', function() {
  it('should render correctly', function() {
    const component = setup({
      onClick: () => {},
      visible: true
    });

    chai.expect(component).to.have.className('glyphicon-minus');
  });

  it('should hide if visible prop is false', function() {
    const component = setup({
      onClick: () => {},
      visible: false
    });

    chai.expect(component).to.have.style('display', 'none');
  });

  it('should trigger given onClick prop', function() {
    const clickSpy = createSpy();

    const component = setup({
      onClick: clickSpy,
      visible: true
    });

    component.simulate('click');

    chai.expect(clickSpy.calls.length).to.equal(1);
  })


})
