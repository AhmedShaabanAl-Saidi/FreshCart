export interface CategoryResponse {
  results: number;
  metadata: Metadata;
  data: category[];
}

export interface category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}