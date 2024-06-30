export class NewCommentEvent {
  constructor(
    public readonly commentId: string,
    public readonly userId: string,
    public readonly message: string,
  ) {}
}
