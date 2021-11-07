import { Player } from './player';
import { Region } from '../enums/region';
import { Role } from '../enums/role';

/**
 * Class for Roster.
 */
export class Roster {
  region: Region;
  limit: Map<Role, number>;
  players: Player[][];

  /**
   * Constructor for Roster object.
   * @param {Region} region Region the roster is for.
   * @param {Map<Role, number>} limit Map that contains number of allowed players for each each Role.
   * @param {Player[][]} players A 2D array of players that represents the siege roster.
   */
  constructor(region: Region, limit: Map<Role, number>, players: Player[][]) {
    this.region = region;
    this.limit = limit;
    this.players = players;
  }

  /**
   * Creates a Json representation of the Roster primarily used for serializing before uploading to Firebase.
   * @returns {any} Object of the Roster class.
   */
  toJson(): any {
    const json: any = {};
    json['region'] = this.region;
    json['limit'] = Object.fromEntries(this.limit);
    json['players'] = this.players;
    return json;
  }
}
