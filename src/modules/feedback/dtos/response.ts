export class FeedbackResponse {
  id: string;
  content: string;
  userId: string;
  orderId: string;
}

export class DeleteFeedbackResponse {
  id: string;
  content: string;
  userId: string;
  orderId: string;
  isDeleted: boolean;
  deletedDate: Date;
}
