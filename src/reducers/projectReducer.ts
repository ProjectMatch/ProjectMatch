import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from '../actions/actionTypes';
import { ProjectState, ProjectAction } from '../types/Redux';
import { CompleteProject } from '../types/Projects';

function projectReducer(
  state: ProjectState = [],
  action: ProjectAction
): ProjectState | Array<CompleteProject> {
  var newState = state.slice();
  switch (action.type) {
    case GET_PROJECTS:
      return action.data as Array<CompleteProject>;
    case ADD_PROJECT:
      newState.push(action.data as CompleteProject);
      return newState;
    case DELETE_PROJECT:
      return action.data as Array<CompleteProject>;
    case UPDATE_PROJECT:
      for (let i = 0; i < newState.length; i++) {
        if (newState[i]._id === (action.data as CompleteProject)._id) {
          newState[i] = action.data as CompleteProject;
        }
      }
      return newState;
    default:
      return state;
  }
}
export default projectReducer;
