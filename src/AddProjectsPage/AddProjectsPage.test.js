import React from 'react';
import { mount, shallow } from 'enzyme';
import AddProjectsPage from './index';

describe('>>>AddProjectsPage Container', () => {
  it('renders without crashing', () => {
    shallow(<AddProjectsPage />);
  });

  it('should change state.title when typing in input box', () => {
    const wrapper = mount(<AddProjectsPage />);
    const nameInput = wrapper.find('#new-project-title');

    nameInput.instance().value = 'New Project Name';
    nameInput.simulate('change');

    expect(wrapper.state().name).toEqual('New Project Name');
  });
  // changing inputs / checkboxes
  // gets saved to state correctly

  // when the link has an ID, pre-load inputs and checkboxes
  // status of project
  // looking for
  // teammates pre-loaded
  // tags pre-loaded
  // category pre-loaded

  // when project data gets submitted
  // gets re-routed to project portal
  // with correct project data

  // image preview is correct when uploading
  // a cover photo

  // adding tags will render the new tags, but not duplicated
  // pressing enter will add a new tag to the list

  // same as above for teams, except pressing enter will not add a new team
});
