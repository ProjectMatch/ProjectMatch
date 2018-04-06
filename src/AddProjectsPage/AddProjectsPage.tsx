import * as React from 'react';
import { connect } from 'react-redux';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import { Store } from '../types/Redux';
import { PassedProps, State } from '../types/AddProjectsPage.d';
import HeaderContainer from '../HeaderContainer';

class AddProjectsPage extends React.Component<PassedProps, State> {
  constructor(props: PassedProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      dueDate: '',
      team: [],
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: [],
      status: '',
      category: '',
      tags: [],
      images: [],
      contact: '',
      creator: ''
    };
  }

  public onFormChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  public onSubmit(e: React.FormEvent<HTMLButtonElement>): void {
    const url = 'http://localhost:8080/api/projects/add';

    let bodyData = {
      name: this.state.name,
      description: '',
      dueDate: '',
      team: [],
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: [],
      status: '',
      category: '',
      tags: [],
      images: [],
      contact: '',
      creator: ''
    };

    let data = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    };

    fetch(url, data)
      /* tslint:disable-next-line */
      .then(function(res: any) {
        if (res.status === 409) {
          alert('User already exists in database');
        } else if (res.status === 200) {
          alert('User added to database');
        } else {
          alert('Error ' + res.status + ' - ' + res.statusText);
        }
      });
  }

  render() {
    return (
      <div>
        <HeaderContainer />
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
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-description"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="new-project-description"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-dueDate"
              >
                Due Date
              </label>
              <input
                type="text"
                name="dueDate"
                id="new-project-dueDate"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label className="newProjectSubText" htmlFor="new-project-team">
                Team
              </label>
              <input
                type="text"
                name="team"
                id="new-project-team"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
            </div>{' '}
            {/* end of box 1 A */}
            <div className="box-1-B">
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
                onChange={e => this.onFormChange(e)}
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
                onChange={e => this.onFormChange(e)}
              />
            </div>{' '}
            {/* end of box 1 B */}
          </div>{' '}
          {/* end of box 1 */}
          <div className="box-2">
            <label
              className="newProjectSubText"
              htmlFor="new-project-lookingFor"
            >
              Looking For
            </label>
            <div className="new-project-lookingFor">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Programmer"
                  id="new-project-role-p"
                  onChange={e => this.onFormChange(e)}
                />
                <label htmlFor="new-project-role-p">Programmer</label>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="roles"
                  value="Designer"
                  id="new-project-role-d"
                  onChange={e => this.onFormChange(e)}
                />
                <label htmlFor="new-project-role-d">Designer</label>
              </div>
            </div>
          </div>{' '}
          {/* end of box 2 */}
        </form>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(AddProjectsPage);
