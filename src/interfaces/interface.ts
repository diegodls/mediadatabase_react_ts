export type Nationalities =
  | "AR"
  | "AU"
  | "CA"
  | "CL"
  | "ES"
  | "DE"
  | "IT"
  | "MX"
  | "NZ"
  | "PT"
  | "ES"
  | "GB"
  | "US";

export interface ITitleOverview {
  id: string;
  title: {
    "@type": string;
    id: string;
    image: {
      height: number;
      id: string;
      url: string;
      width: number;
    };
    runningTimeInMinutes: number;
    nextEpisode: string;
    numberOfEpisodes: number;
    seriesEndYear: number;
    seriesStartYear: number;
    title: string;
    titleType: string;
    year: number;
  };
  certificates: {
    keyof(
      arg0: Nationalities
    ): [{ certificate: string; country: Nationalities }];
  };
  ratings: {
    canRate: boolean;
    rating: number;
    ratingCount: number;
    otherRanks: [{ id: string; label: string; rank: number; rankType: string }];
  };
  genres: string[];
  releaseDate: string;
  plotOutline: {
    id: string;
    text: string;
  };
  plotSummary: {
    author: string;
    id: string;
    text: string;
  };
}
