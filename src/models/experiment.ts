import {UserProfile} from './user-profile';

export class Experiment {
  uidPublisher: string;
  datePublished: number;
  title: String;
  numberParticipants: String;
  place: String;
  description: string;
  duration: number;
  gift: string;
  userProfile: UserProfile;
  placeLatLon: object;
  dates: number[];
}
