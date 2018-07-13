import * as React from 'react';
import { connect } from 'react-redux';
// components
import Footer from '../Footer/Footer';
import LandingImage from './LandingImage';
import ProjectFeatures from './ProjectFeatures';
import RecentProjects from './RecentProjects';
import ReadyToTry from './ReadyToTry';
// types
import { Store, LandingPageProps } from '../types/Redux';

class LandingPage extends React.Component<LandingPageProps, {}> {
  render() {
    return (
      <div>
        <LandingImage />
        <ProjectFeatures />
        <RecentProjects />
        {Object.keys(this.props.user).length === 0 ? <ReadyToTry /> : null}
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

export default connect(mapStateToProps)(LandingPage);
