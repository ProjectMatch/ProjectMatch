export interface AddProjectState {
  shouldRedirect: boolean;
  projIdRedirect: string;
  _id?: string;
  name: string;
  description: string;
  dueDate: string;
  team: Set<any>;
  githubLink: string;
  mockupLink: string;
  liveLink: string;
  lookingFor: Set<any>;
  status?: boolean;
  category: string;
  tags: Set<any>;
  images?: any;
  contact?: string;
  createdAt?: string;
  creator?: string;
  categoryPlaceholder: string;
  tagPlaceholder: string | string[];
  teamPlaceholder: string | string[];
  statusPlaceholder: string;
  preview?: any;
  files: any;
}
