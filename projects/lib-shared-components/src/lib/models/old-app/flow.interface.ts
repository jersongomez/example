export interface Flow {
  step: number;
  name: string;
  component: any;
  next?: number;
}
