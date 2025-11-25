export interface Comparison {
  id: string;
  slug: string;
  before_image_url: string;
  after_image_url: string;
  created_at: string;
}

export interface UploadResponse {
  success: boolean;
  slug?: string;
  error?: string;
}

