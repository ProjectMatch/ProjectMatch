import { GET_USER_PROJECTS } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { CompleteProject } from '../types/Projects';

function userProjectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Array<CompleteProject> {
  switch (action.type) {
    case GET_USER_PROJECTS:
      return action.data as Array<CompleteProject>;
    default:
      return state;
  }
}
export default userProjectReducer;
