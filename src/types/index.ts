export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  published: boolean;
  image_url?: string;
  avatar_url?: string;
  profiles?: {
    email: string;
    display_name?: string;
    full_name?: string;
    avatar_url?: string;
  };
}
