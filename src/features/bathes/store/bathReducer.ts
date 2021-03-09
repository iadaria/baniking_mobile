import { IErrors } from '~/src/app/utils/error';
import { IBath } from '~/src/app/models/bath';

// https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native
export interface IBathState {
  loading: boolean;
  errors: IErrors | null;
  // Bathes
  bathes: Partial<IBath>[];
  selectedBath: IBath | null;
  lastVisible: null;
  filter: string;
  retainState: boolean;

}

const initialState: IBathState = {
  loading: false,
  errors: null,
  bathes: [],
  selectedBath: null,
  filter: 'all',
  retainState: false,
}