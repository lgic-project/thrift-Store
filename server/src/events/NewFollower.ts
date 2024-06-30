export class NewFollowerEvent {
  constructor(
    public readonly followerId: string,
    public readonly followedId: string,
    public readonly message: string,
  ) {}
}
