export interface IUser {
  id: string,
  email: string,
  profile?: IUserProfile
  name?: string,
  signedInAt: string,
  lastSignedInAt: string
}

export interface IUserProfile {
  name: string,
  profilePic?: string,
}