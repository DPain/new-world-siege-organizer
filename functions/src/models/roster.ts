import { Player } from './player';
import { Region } from './region';
import { Role } from './role';

/**
 * Class for Roster.
 */
export class Roster {
  region: Region;
  limit: Record<Role, number>;
  players: Player[][];

  /**
   * Constructor for Roster object.
   * @param {Region} region Region the roster is for.
   * @param {Record<Role, number>} limit Number of allowed players for each each role.
   * @param {Player[][]} players A 2D array of players that represents the siege roster.
   */
  constructor(
    region: Region,
    limit: Record<Role, number>,
    players: Player[][]
  ) {
    this.region = region;
    this.limit = limit;
    this.players = players;
  }
}
