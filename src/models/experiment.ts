import {UserProfile} from './user-profile';
import {Inscription} from './inscription';

export class Experiment {
  placeLatLon: {lat: number, lon: number};
  uidPublisher: string;
  datePublished: number;
  title: string;
  numberParticipants: string;
  place: string;
  description: string;
  duration: number;
  gift: string;
  userProfile: UserProfile;
  dates: number[];
  key: string;
  inscriptions: Inscription[];
}
