export type Opportunity = {
  id: string,
  provider: string,
  url: string,
  title: string,
  isRemote: boolean,
  pcdOnly: boolean,
  companyName?: string,
  cityName?: string,
  publishedAt: Date,
};
