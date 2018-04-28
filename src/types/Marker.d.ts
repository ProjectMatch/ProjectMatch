export interface Marker {
  _id: string;
  type: string;
  x: string;
  y: string;
  creator: string;
  width?: string;
  height?: string;
  comments: Array<{ user: string; message: string; time: string }>;
}
