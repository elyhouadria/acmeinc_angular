export class AuthUser {

  constructor(
    public userId: number,
    public userLastName: string,
    public userFirstName: string,
    public userEmail: string,
    private idToken: string,
    private expires_at: Date
  ) {}

  get token() {
    if (!this.expires_at && new Date() > this.expires_at) {
      return null;
    }
    return this.idToken;
  }

}
