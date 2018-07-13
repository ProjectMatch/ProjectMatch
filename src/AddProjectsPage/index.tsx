import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
// styles
import './AddProjectsPage.css';
// components
import StatusOptionsComponent from './StatusOptionsComponent';
import ChosenTeam from './ChosenTeam';
import ChosenTags from './ChosenTags';
import TagOptionsComponent from './TagOptionsComponent';
import CategoriesOptionsComponent from './CategoriesOptionsComponent';
import TeamOptionsComponent from './TeamOptionsComponent';
import ImagePreview from './ImagePreview';
// types
import { AddProjectState } from './AddProjectsPage.d';
import { Store, AddProjectProps, Users } from '../types/Redux';
import { Tags } from '../types/Tags';
import { Categories } from '../types/Category';
import { NewProject, UpdateProject, CompleteProject } from '../types/Projects';
import { User } from '../types/User';
// actions
import {
  addOrUpdateProject,
  getOneProject,
  getProjects
} from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';

export class AddProjectsPage extends React.Component<
  AddProjectProps,
  AddProjectState
> {
  constructor(props: AddProjectProps) {
    super(props);
    this.state = {
      shouldRedirect: false,
      projIdRedirect: '',
      name: '',
      description: '',
      dueDate: '',
      team: new Set(),
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: new Set(),
      status: true,
      category: '',
      tags: new Set(),
      images: new Set(),
      contact: '',
      creator: '',
      categoryPlaceholder: 'Choose A Category',
      tagPlaceholder: 'Choose Some Tags',
      teamPlaceholder: 'Add Teammates',
      statusPlaceholder: 'Status of Project',
      preview: null,
      files: null
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getTags();
    this.props.getAllUsers();

    /*
      if prefill form url has ID like below
      http://localhost:3000/projects/update/5ae2d77c9b979d4cf8b40c22      
    */
    if (this.props.match.params.hasOwnProperty('id')) {
      this.prefillForm();
    }
  }

  prefillForm() {
    // call data of that one project
    this.props
      .getOneProject(this.props.match.params.id)
      // then update state with requested project data
      .then(() => {
        const project = this.props.currentProject!;
        this.setState({
          ...project,
          team: new Set(project.team),
          lookingFor: new Set(project.lookingFor),
          dueDate: project.dueDate !== null ? project.dueDate.slice(0, 10) : '',
          tags: new Set(project.tags),
          images: new Set(project.images)
        } as AddProjectState);
      });
  }

  // adds value to array only if it doesnt already include it
  addValueToSet = (setName: string, value: string) => {
    this.setState({ [setName]: this.state[setName].add(value) } as any);
  };

  onFormChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ): void | null => {
    e.persist();
    let { name, value } = e.currentTarget;

    switch (name) {
      case 'category':
        this.updateCategory(value);
        break;
      case 'tags':
        this.updateTags(value);
        break;
      case 'team':
        this.updateTeam(value);
        break;
      case 'status':
        this.updateStatus(value);
        break;
      case 'roles':
        this.updateRoles(value);
        break;
      default:
        this.setState({ [name]: value } as any);
        break;
    }
  };

  updateCategory = (value: string) => {
    this.setState({
      category: value,
      categoryPlaceholder: value
    } as any);
  };

  updateTags = (value: string) => {
    this.addValueToSet('tags', value);
  };

  updateTeam = (value: string) => {
    this.addValueToSet('team', value);
  };

  updateStatus = (value: string) => {
    let newStatus = value === 'Active' ? true : false;
    this.setState({ status: newStatus, statusPlaceholder: value });
  };

  updateRoles = (value: string) => {
    let role = this.state.lookingFor!;
    role.has(value) ? role.delete(value) : role.add(value);
    this.setState({ lookingFor: role });
  };

  // removes items such as tags or team members from the state set
  removeItemFromSet = (
    e: React.MouseEvent<HTMLButtonElement>,
    stateName: any
  ): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    this.state[stateName].delete(value);
    this.setState({ [stateName]: this.state[stateName] } as any);
  };

  createProject = () => {
    let project = {
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
      team: Array.from(this.state.team!),
      githubLink: this.state.githubLink,
      mockupLink: this.state.mockupLink,
      liveLink: this.state.liveLink,
      lookingFor: Array.from(this.state.lookingFor!),
      status: this.state.status,
      category: this.state.category,
      tags: Array.from(this.state.tags!),
      contact: this.state.contact,
      creator: this.props.user.username
    } as NewProject;

    // if this is an existing project, pass in the corresponding _id
    if (this.props.match.params.hasOwnProperty('id')) {
      project = {
        ...project,
        _id: this.props.currentProject._id
      } as UpdateProject;
    }
    return project;
  };

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    if (this.state.name === '' && this.state.description === '') {
      alert('Project Name & Description are required 😉');
      return;
    }

    let project = this.createProject();

    // passes in the project object with any images (files)
    this.props
      .addOrUpdateProject(project, this.state.files)
      // returns new project with IDs
      .then((newProject: CompleteProject) => {
        // redirects to the project portal
        this.setState({
          shouldRedirect: true,
          projIdRedirect: newProject._id
        });
      });
  };

  /* --------------------- FILTER --------------------- */
  /* -------------------------------------------------- */
  /* -------------------------------------------------- */
  // TODO: No DOM please, should be in the state
  // filter search from a dropdown
  filter = (filterId: string, elemByName: string) => {
    var filter, inputOptions;
    filter = (document.getElementById(
      filterId
    )! as HTMLInputElement).value.toUpperCase();
    inputOptions = document.getElementsByName(elemByName) as NodeListOf<
      HTMLInputElement
    >;
    for (var i = 0; i < inputOptions.length; i++) {
      if (inputOptions[i].value.toUpperCase().indexOf(filter) !== -1) {
        inputOptions[i].style.display = '';
      } else {
        inputOptions[i].style.display = 'none';
      }
    }
  };

  teamFilter = () => {
    this.filter('teamSearch', 'team');
  };

  tagFilter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.persist();
    this.filter('tagSearch', 'tags');
    const ENTER_KEY = 13;
    // on 'enter', adds new tag to array in state if it doesnt already exist
    if (e.keyCode === ENTER_KEY) {
      // try not to do it with DOM? use State
      var value = (document.getElementById('tagSearch')! as HTMLInputElement)
        .value;
      this.addValueToSet('tags', value);
    }
  };

  categoryFilter = () => {
    this.filter('categorySearch', 'category');
  };

  /* -------------------------------------------------- */
  /* -------------------------------------------------- */
  /* -------------------------------------------------- */

  // opens initial file window to select images from local computer
  // saves files to state
  selectLocalImages = (e: React.FormEvent<HTMLInputElement>): void => {
    const imageFiles = e.currentTarget.files! as FileList;
    this.setState({ files: imageFiles } as any);
  };

  // clears images from image preview section and state
  clearImages = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.setState({ files: null });
    e.preventDefault();
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          push={true}
          from="/projects/add"
          to={'/projects/' + this.state.projIdRedirect}
        />
      );
    }

    return (
      <div className="new-project-body">
        <form className="new-project-container">
          <div className="box-1">
            {box1a(
              this.onFormChange,
              this.teamFilter,
              this.removeItemFromSet,
              this.state,
              this.props
            )}
            {box1b(
              this.onFormChange,
              this.categoryFilter,
              this.tagFilter,
              this.removeItemFromSet,
              this.state,
              this.props
            )}
          </div>
          {box2(
            this.onFormChange,
            this.selectLocalImages,
            this.clearImages,
            this.handleSubmit,
            this.state
          )}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects,
    categories: state.categories,
    allTags: state.tags,
    allUsers: state.allUsers,
    imageLinks: state.imageLinks,
    currentProject: state.addOrUpdateProject
  };
}

export default connect(mapStateToProps, {
  addOrUpdateProject,
  getAllUsers,
  getCategories,
  getTags,
  getOneProject,
  getProjects
})(AddProjectsPage as any);

/*
======================================================
PRESENTATIONAL COMPONENTS
======================================================
*/

interface Box1aState {
  name: string;
  description: string;
  dueDate: string;
  teamPlaceholder: string | string[];
  team: Set<any>;
}
interface Box1aProps {
  allUsers: Users;
  user: User;
}
// box1a PRESENTATIONAL COMPONENT
function box1a(
  onFormChange: any,
  teamFilter: any,
  removeItemFromSet: any,
  { name, description, dueDate, teamPlaceholder, team }: Box1aState,
  { allUsers, user }: Box1aProps
) {
  return (
    <div className="box-1-a">
      <label className="newProjectSubText" htmlFor="new-project-title">
        Project Title
      </label>
      <input
        type="text"
        name="name"
        id="new-project-title"
        className="new-project-input"
        value={name}
        onChange={e => onFormChange(e)}
      />

      <label className="newProjectSubText" htmlFor="new-project-description">
        Descriptions
      </label>
      <textarea
        name="description"
        id="new-project-description"
        className="new-project-textarea"
        maxLength={360}
        value={description}
        onChange={e => onFormChange(e)}
      />

      <label className="newProjectSubText" htmlFor="new-project-dueDate">
        Due Date
      </label>
      <input
        type="date"
        name="dueDate"
        id="new-project-dueDate"
        className="new-project-input"
        value={dueDate}
        onChange={e => onFormChange(e)}
      />
      <div className="new-project-team">
        <label className="newProjectSubText" htmlFor="new-project-team">
          Team
        </label>
        <div className="new-project-team-dropdown-btn">
          {teamPlaceholder}
          <div id="new-team-dropdown" className="new-project-category-content">
            <TeamOptionsComponent
              allUsers={allUsers}
              user={user}
              onFormChange={onFormChange}
              teamFilter={teamFilter}
            />
          </div>
        </div>

        {team!.size !== 0 ? (
          <ChosenTeam team={team} removeItemFromSet={removeItemFromSet} />
        ) : null}
      </div>
    </div>
  );
}

interface Box1bState {
  githubLink: string | undefined;
  mockupLink: string;
  liveLink: string;
  category: string | undefined;
  categoryPlaceholder: string;
  tagPlaceholder: string | string[];
  tags: Set<any>;
}
interface Box1bProps {
  categories: Categories | any;
  allTags: Tags | any;
}
// box1a PRESENTATIONAL COMPONENT
function box1b(
  onFormChange: any,
  categoryFilter: any,
  tagFilter: any,
  removeItemFromSet: any,
  {
    githubLink,
    mockupLink,
    liveLink,
    category,
    categoryPlaceholder,
    tagPlaceholder,
    tags
  }: Box1bState,
  { categories, allTags }: Box1bProps
) {
  return (
    <div className="box-1-b">
      <label className="newProjectSubText" htmlFor="new-project-githubLink">
        Github Link
      </label>
      <input
        type="text"
        name="githubLink"
        id="new-project-githubLink"
        className="new-project-input"
        value={githubLink}
        onChange={onFormChange}
      />

      <label className="newProjectSubText" htmlFor="new-project-mockupLink">
        Mockup Link
      </label>
      <input
        type="text"
        name="mockupLink"
        id="new-project-mockupLink"
        className="new-project-input"
        value={mockupLink}
        onChange={e => onFormChange(e)}
      />

      <label className="newProjectSubText" htmlFor="new-project-liveLink">
        Live Link
      </label>
      <input
        type="text"
        name="liveLink"
        id="new-project-liveLink"
        className="new-project-input"
        value={liveLink}
        onChange={e => onFormChange(e)}
      />

      <div className="new-project-category">
        <label className="newProjectSubText" htmlFor="new-project-dropdown">
          Category
        </label>
        <div className="new-project-category-dropdown-btn">
          {category !== '' ? category : categoryPlaceholder}
          <div
            id="new-project-dropdown"
            className="new-project-category-content"
          >
            <CategoriesOptionsComponent
              categories={categories}
              onFormChange={onFormChange}
              categoryFilter={categoryFilter}
            />
          </div>
        </div>
      </div>

      <div className="new-project-tags">
        <label className="newProjectSubText" htmlFor="new-tags-dropdown">
          Tags
        </label>
        <div className="new-project-tags-dropdown-btn">
          {tagPlaceholder}
          <div id="new-tags-dropdown" className="new-project-category-content">
            <TagOptionsComponent
              formChange={onFormChange}
              tags={allTags}
              tagFilter={tagFilter}
            />
          </div>
        </div>
        <ChosenTags tags={tags} removeItemFromSet={removeItemFromSet} />
      </div>
    </div>
  );
}

interface Box2State {
  lookingFor: Set<any>;
  files: any;
  statusPlaceholder: string;
}

function box2(
  onFormChange: any,
  selectLocalImages: any,
  clearImages: any,
  handleSubmit: any,
  { lookingFor, files, statusPlaceholder }: Box2State
) {
  return (
    <div className="box-2">
      <div className="new-project-max-width new-project-lookingFor">
        <label className="newProjectSubText" htmlFor="new-project-lookingFor">
          Looking For
        </label>

        <div className="new-project-checkbox-container">
          <div className="checkboxContainer">
            <label className="new-project-text" htmlFor="new-project-role-p">
              Programmer
              <input
                className="new-project-roles"
                type="checkbox"
                name="roles"
                value="Programmer"
                id="new-project-role-p"
                checked={lookingFor!.has('Programmer')}
                onChange={e => onFormChange(e)}
              />
              <span className="checkmark" />
            </label>
          </div>

          <div className="checkboxContainer">
            <label className="new-project-text" htmlFor="new-project-role-d">
              Designer
              <input
                className="new-project-roles"
                type="checkbox"
                name="roles"
                value="Designer"
                id="new-project-role-d"
                checked={lookingFor!.has('Designer')}
                onChange={e => onFormChange(e)}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>

      <div className="new-project-max-width new-project-upload">
        <label className="newProjectSubText" htmlFor="uploadImage">
          Cover Photo
        </label>
        <input
          type="file"
          id="uploadImage"
          accept="image/png, image/jpeg, image/gif"
          name="projectImages"
          className="uploadImageBtn"
          multiple={false}
          onChange={selectLocalImages}
        />
        <button
          className="upload-img-delete-btn"
          type="submit"
          onClick={clearImages}
        >
          Clear Image
        </button>
        <ImagePreview files={files} />
      </div>

      <div className="new-project-status">
        <label className="newProjectSubText" htmlFor="new-project-status">
          Status
        </label>
        <div className="new-project-status-dropdown-btn">
          {statusPlaceholder}
          <div
            id="new-status-dropdown"
            className="new-project-category-content"
          >
            <StatusOptionsComponent onFormChange={onFormChange} />
          </div>
        </div>
      </div>

      <button
        id="project-submit-btn"
        type="button"
        className="new-project-submit-btn"
        onClick={handleSubmit}
      >
        Save Project
      </button>
    </div>
  );
}
