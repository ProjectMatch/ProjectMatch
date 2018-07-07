import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { AddProjectsPage } from './index';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

// store stub
describe('>>>AddProjectsPage Component', () => {
  let wrapper;
  const addOrUpdateProjectfn = jest.fn();
  const getAllUsersfn = jest.fn();
  const getCategoriesfn = jest.fn();
  const getTagsfn = jest.fn();
  const getOneProjectfn = jest.fn();
  const getProjectsfn = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <AddProjectsPage
        addOrUpdateProject={addOrUpdateProjectfn}
        getAllUsers={getAllUsersfn}
        getCategories={getCategoriesfn}
        getTags={getTagsfn}
        getOneProject={getOneProjectfn}
        getProject={getProjectsfn}
      />
    );
  });

  it('should call mock submit function', () => {
    wrapper
      .find('#project-submit-btn')
      .simulate('submit', { preventDefault() {} });
    expect(addOrUpdateProjectfn.mock.calls.length).toBe(1);
  });

  // it('should change state.title when typing in input box', () => {
  //   const wrapper = mount(<AddProjectsPage />);
  //   const nameInput = wrapper.find('#new-project-title');

  //   nameInput.instance().value = 'New Project Name';
  //   nameInput.simulate('change');

  //   expect(wrapper.state().name).toEqual('New Project Name');
  // });
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
