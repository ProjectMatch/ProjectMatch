import { CompleteProject } from '../types/Projects.d';
export interface State {}

// Action
export interface Action {
  type: string;
}

export interface ProjectAction extends Action {
  data: CompleteProject;
}

export interface ProjectPageState {
  searchTerm: string;
  projectComponent: any | null;
}
