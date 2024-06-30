export class NewReviewEvent {
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
    public readonly message: string,
  ) {}
}
