import { Role } from '../enums/role';

/**
 * Class for Player.
 */
class Player {
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

  /**
   * Creates a Player class from a PlayerJson.
   * @param {PlayerJson} json json interface for Player.
   * @returns {Player} class representation of the json.
   */
  static fromJson(json: PlayerJson): Player {
    const name: string = json.name;
    const gearscore: number = json.gearscore;
    const roles: Role[] = json.roles;

    const result = new Player(name, gearscore, roles);
    return result;
  }

  /**
   * Creates a Json representation of the Player primarily used for serializing before uploading to Firebase.
   * @returns {any} Object of the Player class.
   */
  toJson(): any {
    const json: any = {};
    json['name'] = this.name;
    json['gearscore'] = this.gearscore;
    json['roles'] = this.roles;
    return json;
  }
}

interface PlayerJson {
  name: string;
  gearscore: number;
  roles: any;
}

export { Player, PlayerJson };
