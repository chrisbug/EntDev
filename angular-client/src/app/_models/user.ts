import {UserHolding} from './userholding.model';
import {SoldUserHolding} from './usersoldholdings.model';

export class User {
  _id: string;
  email: string;
  holdings: UserHolding[];
  soldHoldings: SoldUserHolding[];
}
