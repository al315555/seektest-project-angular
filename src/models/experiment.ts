import {UserProfile} from './user-profile';

export class Experiment {
  placeLatLon: {lat: number, lon: number};
  uidPublisher: string;
  datePublished: number;
  title: String;
  numberParticipants: String;
  place: String;
  description: string;
  duration: number;
  gift: string;
  userProfile: UserProfile;
  dates: number[];
  key: string;
}
