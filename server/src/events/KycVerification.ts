export class KycVerificationEvent {
  constructor(
    public readonly userId: string,
    public readonly message: string,
  ) {}
}
