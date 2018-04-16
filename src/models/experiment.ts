import {UserProfile} from './user-profile';

export class Experiment {
  datePublished: number;
  title: String;
  numberParticipants: String;
  place: String;
  description: string;
  duration: number;
  gift: string;
  userProfile: UserProfile;
  uidPublisher: string;
  placeLatLon: object;
  dates: number[];
}
