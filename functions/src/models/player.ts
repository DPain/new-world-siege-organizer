import { Role } from './role';

/**
 * Class for Player.
 */
export class Player {
  name: string;
  gearscore: number;
  roles: Role[];

  /**
   * Constructor for Player object.
   * @param {string} name Name of the player.
   * @param {number} gearscore Gearscore.
   * @param {Role[]} roles An array of roles the player can play.
   */
  constructor(name: string, gearscore: number, roles: Role[]) {
    this.name = name;
    this.gearscore = gearscore;
    this.roles = roles;
  }
}
