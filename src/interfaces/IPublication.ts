export default interface IPublication {
  id: null;
  guid: string;
  created: string;
  modified: string;
  content: string;
  date: Date;
  week: null;
  month: null;
  excerpt: string;
  header_image: string;
  pages_number: string;
  language: string;
  title: string;
  type: string;
  url: string;
  status: Status;
  created_by_id: string;
  institutions: IInstitution[];
  journals: IJournal[];
  dossiers: string[];
  feedback: null;
}
export enum Content {
  Tbd = "tbd",
}

export interface IInstitution {
  country: string;
  name: string;
  home_page: string;
  download_page: string;
  abbreviation: string;
  is_active: string;
}

export enum Status {
  Draft = "Draft",
  Published = "published",
  StatusPublished = "Published",
}

export enum ICountry {
  De = "DE",
  Deutschland = "Deutschland",
  Eu = "EU",
  Global = "Global",
  Uk = "UK",
}

export enum IType {
  Analyse = "analyse",
  Factsheet = "factsheet",
  Paper = "paper",
  Studie = "studie",
}

export interface IJournal {
  name: string;
  guid: string;
}
