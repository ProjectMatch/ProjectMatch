import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_ONE_PROJECT,
  SEARCH_PROJECT,
  GET_PROJECT,
  DOWNLOAD_PROJECT_IMAGE_URLS
} from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export function getProjects(
  options: object,
  query: object | null
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProjects(options, query).then(projects => {
      if (projects) {
        return dispatch({
          type: GET_PROJECTS,
          data: projects
        });
      } else {
        return null;
      }
    });
  };
}

export function searchProjects(
  query: string | null
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return dispatch({
      type: SEARCH_PROJECT,
      data: query
    });
  };
}

export function getProject(
  projectId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getProject(projectId).then(project => {
      if (project) {
        return dispatch({
          type: GET_PROJECT,
          data: project
        });
      } else {
        return null;
      }
    });
  };
}
export function addProject(
  project: any,
  files: FileList
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.addProject(project).then(newProject => {
      if (files) {
        return apiService.uploadProjectImage(files, newProject._id).then(() => {
          return dispatch({
            type: ADD_PROJECT,
            data: newProject
          });
        });
      } else {
        return dispatch({
          type: ADD_PROJECT,
          data: newProject
        });
      }
    });
  };
}

export function updateProject(
  project: any,
  files: FileList
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.updateProject(project).then(projects => {
      if (files) {
        return apiService.uploadProjectImage(files, projects._id).then(() => {
          return dispatch({
            type: UPDATE_PROJECT,
            data: projects
          });
        });
      } else {
        return dispatch({
          type: UPDATE_PROJECT,
          data: projects
        });
      }
    });
  };
}

export function getOneProject(
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getOneProject(id).then(project => {
      return dispatch({
        type: GET_ONE_PROJECT,
        data: project
      });
    });
  };
}

export function deleteProject(
  id: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.deleteProject(id).then(project => {
      return dispatch({
        type: DELETE_PROJECT,
        data: project
      });
    });
  };
}

export function downloadProjectImageURLS(
  projectId: string
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.downloadProjectImageURLS(projectId).then(urls => {
      return dispatch({
        type: DOWNLOAD_PROJECT_IMAGE_URLS,
        data: urls
      });
    });
  };
}
