import { User } from './User';
import { Dispatch } from 'react-redux';
import { Action } from './Redux';

export interface BaseProject {
  name?: string;
  creator?: string;
  images?: string[] | null[];
  team?: string[];
  description?: string;
  contact?: string;
  lookingFor?: string[];
  dueDate?: number | any;
  category?: string;
  status?: boolean;
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  tags?: string[];
}

export interface NewProject extends BaseProject {
  files?: any;
}

export interface UpdateProject extends BaseProject {
  _id: string;
}

export interface CompleteProject extends BaseProject {
  _id: string;
  createdAt?: number;
  modifiedAt?: number;
  comments?: string | Array<string>; // Need to update all dependents
  mockups?: Array<string>;
  upVotes?: number;
  views?: number;
}

// Props is to declare any types of props passed in from parent react container
// In this case, there are no props passed in, so its an empty object
export interface Props {
  project: BaseProject;
  index?: number;
  projId: string;
}
