import * as React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
// styles
import './AddProjectsPage.css';
// components
import Footer from '../Footer/Footer';
import StatusOptionsComponent from './StatusOptionsComponent';
import ChosenTeam from './ChosenTeam';
import ChosenTags from './ChosenTags';
import TagOptionsComponent from './TagOptionsComponent';
import CategoriesOptionsComponent from './CategoriesOptionsComponent';
import TeamOptionsComponent from './TeamOptionsComponent';
// types
import { AddProjectState } from './AddProjectsPage.d';
import { Store, AddProjectProps } from '../types/Redux';
// actions
import {
  addOrUpdateProject,
  getOneProject,
  getProjects
} from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';

class AddProjectsPage extends React.Component<
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
      team: [],
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: [],
      status: true,
      category: '',
      tags: [],
      images: [],
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

    // if there was an ID passed in with the url link
    if (this.props.match.params.hasOwnProperty('id')) {
      // call data of that one project
      this.props
        .getOneProject(this.props.match.params.id)
        // then update state with requested project data
        .then(() => {
          var project = this.props.currentProject!;
          this.setState({
            name: project.name,
            description: project.description,
            dueDate:
              project.dueDate !== null ? project.dueDate.slice(0, 10) : '',
            team: project.team,
            githubLink: project.githubLink,
            mockupLink: project.mockupLink,
            liveLink: project.liveLink,
            lookingFor: project.lookingFor,
            status: project.status,
            category: project.category,
            tags: project.tags,
            images: project.images,
            contact: project.contact,
            creator: project.creator,
            categoryPlaceholder: 'Choose A Category',
            tagPlaceholder: 'Choose Some Tags',
            teamPlaceholder: 'Add Teammates',
            statusPlaceholder: 'Status of Project',
            preview: null,
            files: null
          });
        })
        // then toggles roles checkbox per project lookingFor array
        .then(() => {
          var p = document.getElementById(
            'new-project-role-p'
          )! as HTMLInputElement;
          var d = document.getElementById(
            'new-project-role-d'
          )! as HTMLInputElement;
          switch (this.state.lookingFor) {
            case ['Programmer']:
              p.checked = true;
              break;
            case ['Designer']:
              d.checked = true;
              break;
            case []:
              // in the case of an empty roles array, do nothing!
              break;
            default:
              d.checked = true;
              p.checked = true;
              break;
          }
        });
    }
  }

  getURLParams = () => {
    return this.props.match.params;
  };

  toggleDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>,
    elemById: string
  ) => {
    e.preventDefault();
    var doc = document.getElementById(elemById)!;
    doc.classList.toggle('new-project-show');
  };

  closeDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    var arrayOfWindows = [
      'new-team-dropdown',
      'new-tags-dropdown',
      'new-project-dropdown',
      'new-status-dropdown'
    ];
    arrayOfWindows.forEach((elemById: string) => {
      if (
        document
          .getElementById(elemById)!
          .classList.contains('new-project-show') &&
        document.activeElement !== document.getElementById('teamSearch') &&
        document.activeElement !== document.getElementById('categorySearch') &&
        document.activeElement !== document.getElementById('tagSearch') &&
        document.activeElement !==
          document.getElementById(elemById)!.previousElementSibling
      ) {
        var doc = document.getElementById(elemById)!;
        doc.classList.remove('new-project-show');
      }
    });
  };

  // adds value to array only if it doesnt already include it
  addValueToStateArray = (arrayName: string, value: string) => {
    if (!this.state[arrayName].includes(value.toLowerCase())) {
      var newArray = this.state[arrayName].concat([value]);
      this.setState({ [arrayName]: newArray } as any);
    }
  };

  onFormChange = (e: React.FormEvent<HTMLInputElement>): void | null => {
    e.persist();
    var { name, value } = e.currentTarget;

    switch (name) {
      case 'category':
        this.setState({
          category: value,
          categoryPlaceholder: value
        } as any);
        this.toggleDropdown(e, 'new-project-dropdown');
        break;
      case 'tags':
        this.addValueToStateArray('tags', value);
        this.toggleDropdown(e, 'new-tags-dropdown');
        break;
      case 'team':
        this.addValueToStateArray('team', value);
        this.toggleDropdown(e, 'new-team-dropdown');
        break;
      case 'status':
        var newStatus = value === 'Active' ? true : false;
        this.setState({ status: newStatus, statusPlaceholder: value });
        this.toggleDropdown(e, 'new-status-dropdown');
        break;
      case 'roles':
        var nodeList = Array.from(document.getElementsByName('roles'));
        if (document.getElementsByName('roles') === null) {
          this.setState({ lookingFor: [] } as any);
        } else {
          var arrayOfRoles: string[] = [];
          // checks to see if an of the 'roles' nodes are checked
          nodeList.forEach(function(node: any) {
            if (node.checked) {
              arrayOfRoles.push(node.value);
            }
          });
          this.setState({ lookingFor: arrayOfRoles } as any);
        }
        break;
      default:
        this.setState({ [name]: value } as any);
        break;
    }
  };

  // removes items such as tags or team members from the state array
  handleOptionRemoval = (
    e: React.MouseEvent<HTMLButtonElement>,
    stateName: any,
    array: string[]
  ): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var index = array.indexOf(value);
    array.splice(index, 1);
    this.setState({ [stateName]: array });
  };

  onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({ [name]: value } as any);
  }

  handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    var title = document.getElementById('new-project-title') as any;
    var description = document.getElementById('new-project-description') as any;

    if (title.value === '' && description.value === '') {
      alert('Title and Description are required 😉');
      return;
    }

    var elemList = document.getElementsByClassName('new-project-roles');
    var elements = [].filter.call(elemList, function(elem: any) {
      return elem.checked;
    });

    var lookingForArray: string[] = [];
    elements.forEach(function(elem: any) {
      lookingForArray.push(elem.value);
    });

    this.setState({ lookingFor: lookingForArray }, () => {
      var projectToCreateOrUpdate = {
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        team: this.state.team,
        githubLink: this.state.githubLink,
        mockupLink: this.state.mockupLink,
        liveLink: this.state.liveLink,
        lookingFor: this.state.lookingFor,
        status: this.state.status,
        category: this.state.category,
        tags: this.state.tags,
        contact: this.state.contact,
        creator: this.props.user.username
      };
      // if this is an existing project, passes in the corresponding _id
      // the api will check to update or add the project according to whether
      // an _id is passed in
      if (this.props.match.params.hasOwnProperty('id')) {
        projectToCreateOrUpdate = Object.assign({}, projectToCreateOrUpdate, {
          _id: this.props.currentProject._id
        });
      }

      // passes in the project object with any images (files)
      this.props
        .addOrUpdateProject(projectToCreateOrUpdate, this.state.files)
        .then(() => {
          // retrieves all projects, sorted by newest modified
          this.props
            .getProjects({ sort: { modifiedAt: -1 } }, null)
            .then(() => {
              // redirects to the project portal
              this.setState({
                shouldRedirect: true,
                projIdRedirect: this.props.projects[0]._id
              });
            });
        });
    });
  };

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
      var value = (document.getElementById('tagSearch')! as HTMLInputElement)
        .value;
      this.addValueToStateArray('tags', value);
      this.toggleDropdown(e, 'new-tags-dropdown');
    }
  };

  categoryFilter = () => {
    this.filter('categorySearch', 'category');
  };

  // opens initial file window to select images from local computer
  // saves files to state
  handleImageInitialBtn = (e: React.FormEvent<HTMLInputElement>): void => {
    let files = e.currentTarget.files! as FileList;
    this.setState({ files: files } as any);
  };

  // clears images from image preview section and state
  handleImageClear = (e: React.FormEvent<HTMLButtonElement>): void => {
    const preview = document.getElementById('new-project-image-preview')!;
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    this.setState({ files: null });
    e.preventDefault();
  };

  // renders images in the preview area
  handleImagePreview = (e: React.FormEvent<HTMLButtonElement>): void => {
    // currently makes preview of images
    e.preventDefault();
    const preview = document.getElementById('new-project-image-preview')!;
    function readAndPreview(file: File) {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function() {
          var image = new Image();
          image.title = file.name;
          image.src = reader.result;
          image.width = 130;
          image.height = 70;
          preview.appendChild(image);
        },
        false
      );
      reader.readAsDataURL(file);
    }

    if (this.state.files) {
      for (var i = 0; i < this.state.files.length; i++) {
        readAndPreview(this.state.files[i]);
      }
    }
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
      <div className="new-project-body" onClick={e => this.closeDropdown(e)}>
        <form className="new-project-container">
          <div className="box-1">
            <div className="box-1-a">
              <label className="newProjectSubText" htmlFor="new-project-title">
                Project Title
              </label>
              <input
                type="text"
                name="name"
                id="new-project-title"
                className="new-project-input"
                value={this.state.name}
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-description"
              >
                Description
              </label>
              <textarea
                name="description"
                id="new-project-description"
                className="new-project-textarea"
                maxLength={360}
                value={this.state.description}
                onChange={e => this.onTextAreaFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-dueDate"
              >
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="new-project-dueDate"
                className="new-project-input"
                value={this.state.dueDate}
                onChange={e => this.onFormChange(e)}
              />
              <div className="new-project-team">
                <label className="newProjectSubText" htmlFor="new-project-team">
                  Team
                </label>
                <button
                  onClick={e => this.toggleDropdown(e, 'new-team-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.teamPlaceholder}
                </button>
                <div
                  id="new-team-dropdown"
                  className="new-project-category-content"
                >
                  <TeamOptionsComponent
                    allUsers={this.props.allUsers}
                    user={this.props.user}
                    onFormChange={this.onFormChange}
                    teamFilter={this.teamFilter}
                  />
                </div>
                <div className="array-of-tags">
                  <ChosenTeam
                    team={this.state.team}
                    handleOptionRemoval={this.handleOptionRemoval}
                  />
                </div>
              </div>
            </div>
            {/* end of box 1 A */}
            <div className="box-1-b">
              <label
                className="newProjectSubText"
                htmlFor="new-project-githubLink"
              >
                Github Link
              </label>
              <input
                type="text"
                name="githubLink"
                id="new-project-githubLink"
                className="new-project-input"
                value={this.state.githubLink}
                onChange={this.onFormChange}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-mockupLink"
              >
                Mockup Link
              </label>
              <input
                type="text"
                name="mockupLink"
                id="new-project-mockupLink"
                className="new-project-input"
                value={this.state.mockupLink}
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-liveLink"
              >
                Live Link
              </label>
              <input
                type="text"
                name="liveLink"
                id="new-project-liveLink"
                className="new-project-input"
                value={this.state.liveLink}
                onChange={e => this.onFormChange(e)}
              />

              <div className="new-project-category">
                <label
                  className="newProjectSubText"
                  htmlFor="new-project-dropdown"
                >
                  Category
                </label>
                <button
                  onClick={e => this.toggleDropdown(e, 'new-project-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.category !== ''
                    ? this.state.category
                    : this.state.categoryPlaceholder}
                </button>
                <div
                  id="new-project-dropdown"
                  className="new-project-category-content"
                >
                  <CategoriesOptionsComponent
                    categories={this.props.categories}
                    onFormChange={this.onFormChange}
                    categoryFilter={this.categoryFilter}
                  />
                </div>
              </div>

              <div className="new-project-tags">
                <label
                  className="newProjectSubText"
                  htmlFor="new-tags-dropdown"
                >
                  Tags
                </label>
                <button
                  onClick={e => this.toggleDropdown(e, 'new-tags-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.tagPlaceholder}
                </button>
                <div
                  id="new-tags-dropdown"
                  className="new-project-category-content"
                >
                  <TagOptionsComponent
                    formChange={this.onFormChange}
                    tags={this.props.tags}
                    tagFilter={this.tagFilter}
                  />
                </div>
                <ChosenTags
                  tags={this.state.tags}
                  handleOptionRemoval={this.handleOptionRemoval}
                />
              </div>
            </div>
            {/* end of box 1 B */}
          </div>
          {/* end of box 1 */}

          <div className="box-2">
            <div className="new-project-max-width new-project-lookingFor">
              <label
                className="newProjectSubText"
                htmlFor="new-project-lookingFor"
              >
                Looking For
              </label>

              <div className="new-project-checkbox-container">
                <div className="checkboxContainer">
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-p"
                  >
                    Programmer
                    <input
                      className="new-project-roles"
                      type="checkbox"
                      name="roles"
                      value="Programmer"
                      id="new-project-role-p"
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="checkboxContainer">
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-d"
                  >
                    Designer
                    <input
                      className="new-project-roles"
                      type="checkbox"
                      name="roles"
                      value="Designer"
                      id="new-project-role-d"
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
                onChange={this.handleImageInitialBtn}
              />
              <button
                className="upload-img-btn"
                type="submit"
                onClick={this.handleImagePreview}
              >
                Upload Images
              </button>
              <button
                className="upload-img-delete-btn"
                type="submit"
                onClick={this.handleImageClear}
              >
                Clear Images
              </button>

              <div id="new-project-image-loader">{this.state.preview}</div>
              <div id="new-project-image-preview">
                {/* image preview container */}
              </div>
            </div>

            <div className="new-project-status">
              <label className="newProjectSubText" htmlFor="new-project-status">
                Status
              </label>
              <button
                onClick={e => this.toggleDropdown(e, 'new-status-dropdown')}
                className="new-project-dropdown-btn"
              >
                {this.state.statusPlaceholder}
              </button>
              <div
                id="new-status-dropdown"
                className="new-project-category-content"
              >
                <StatusOptionsComponent onFormChange={this.onFormChange} />
              </div>
            </div>

            <button
              type="button"
              className="new-project-submit-btn"
              onClick={this.handleSubmit}
            >
              Save Project
            </button>
          </div>
          {/* end of box 2 */}
        </form>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects,
    categories: state.categories,
    tags: state.tags,
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
