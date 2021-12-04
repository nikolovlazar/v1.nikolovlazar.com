export type Course = {
  id: string;
  title: string;
  description: string;
  url: string;
  live?: boolean;
  progress?: number;
  image?: string;
  expectedLaunch?: string;
  formId?: string;
};
