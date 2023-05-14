export interface DataType {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  comments: CommentType[];
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: ReplyType[];
}

export interface ReplyType {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}
