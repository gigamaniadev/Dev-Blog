export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
