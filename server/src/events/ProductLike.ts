export class ProductLikeEvent {
  constructor(
    public readonly productId: string,
    public readonly userId: string,
    public readonly message: string,
  ) {}
}
