export interface IKeywords {
  id: number;
  keywords: IKeyword[];
}

export interface ITVKeywords {
  id: number;
  results: IKeyword[];
}

export interface IKeyword {
  id: number;
  name: string;
}
