import { GET_ONE_PROJECT } from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { CompleteProject } from '../types/Projects';

function addOrUpdateProjectReducer(
  state: ProjectState | CompleteProject = [],
  action: ProjectAction
): ProjectState | CompleteProject {
  switch (action.type) {
    case GET_ONE_PROJECT:
      return action.data as CompleteProject;
    default:
      return state;
  }
}
export default addOrUpdateProjectReducer;
