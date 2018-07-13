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
  const addOrUpdateProjectfn = jest.fn().mockResolvedValue({});
  const getAllUsersfn = jest.fn();
  const getCategoriesfn = jest.fn().mockResolvedValue(['Developer Tools']);
  const getTagsfn = jest.fn().mockResolvedValue(['chingu']);
  const getOneProjectfn = jest.fn();
  const getProjectsfn = jest.fn().mockResolvedValue([]);

  const props = {
    user: {},
    projects: [],
    categories: ['Developer Tools'],
    tags: ['chingu'],
    allUsers: [],
    imageLinks: [],
    currentProject: {},
    match: { params: {} }
  };

  beforeEach(() => {
    wrapper = shallow(
      <AddProjectsPage
        addOrUpdateProject={addOrUpdateProjectfn}
        getAllUsers={getAllUsersfn}
        getCategories={getCategoriesfn}
        getTags={getTagsfn}
        getOneProject={getOneProjectfn}
        getProject={getProjectsfn}
        {...props}
      />
    );
  });
  it('should call mock submit function', () => {
    wrapper.find('#new-project-title').simulate('change', {
      persist() {},
      currentTarget: { name: 'name', value: 'New Project Title' }
    });

    wrapper.find('#new-project-description').simulate('change', {
      persist() {},
      currentTarget: { name: 'description', value: 'Describing the project' }
    });

    wrapper.find('#new-project-role-p').simulate('change', {
      persist() {},
      currentTarget: { name: 'roles', value: 'Programmer' }
    });

    wrapper.find('#new-project-role-d').simulate('change', {
      persist() {},
      currentTarget: { name: 'roles', value: 'Designer' }
    });

    // wrapper.findWhere(n => n.props().value === 'category')
    // .simulate('change', {
    //   persist() {},
    //   currentTarget: { name: 'category', value: 'Developer Tools' }
    // });

    wrapper
      .find('#project-submit-btn')
      .simulate('click', { preventDefault() {} });

    expect(addOrUpdateProjectfn.mock.calls.length).toBe(1);
    expect(addOrUpdateProjectfn.mock.calls[0][0]).toMatchObject({
      name: 'New Project Title',
      description: 'Describing the project',
      lookingFor: ['Programmer', 'Designer']
      // category: 'Developer Tools'
    });
  });
});

describe('>>>UpdateProjectsPage Component', () => {
  let wrapper;
  const addOrUpdateProjectfn = jest.fn().mockResolvedValue({});
  const getAllUsersfn = jest.fn();
  const getCategoriesfn = jest.fn();
  const getTagsfn = jest.fn();
  const getOneProjectfn = jest.fn().mockResolvedValue({
    name: 'Mock Project',
    description: 'Testing project description',
    team: ['fs'],
    category: 'Developer Tools',
    tags: ['chingu']
  });
  const getProjectsfn = jest.fn().mockResolvedValue([]);

  const existingProps = {
    user: {},
    projects: [],
    categories: [],
    tags: [],
    allUsers: [],
    imageLinks: [],
    currentProject: {
      name: 'Mock Project',
      description: 'Testing project description',
      team: ['fs'],
      category: 'Developer Tools',
      tags: ['chingu']
    },
    match: { params: { id: '123456789' } }
  };

  beforeEach(() => {
    wrapper = mount(
      <AddProjectsPage
        addOrUpdateProject={addOrUpdateProjectfn}
        getAllUsers={getAllUsersfn}
        getCategories={getCategoriesfn}
        getTags={getTagsfn}
        getOneProject={getOneProjectfn}
        getProject={getProjectsfn}
        {...existingProps}
      />
    );
  });
  it('should have existing project stats in state', () => {
    // expect(wrapper.state()).toMatchObject({
    //   name: 'Mock Project',
    //   description: 'Testing project description',
    //   team: ['fs'],
    //   category: 'Developer Tools',
    //   tags: ['chingu']
    // });
  });
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
