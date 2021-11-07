import { Region } from '../enums/region';
import { Role, RoleLimitJson } from '../enums/role';
// import { Player } from '../models/player';

/**
 * Parses a given dictionary into a Record that is guaranteed to have all the Role enums as keys.
 * @param {RoleLimitJson} limits
 * @return {Map<Role, number>} Formated Record of limits for each Role.
 */
function parseLimit(limits: RoleLimitJson): Map<Role, number> {
  // TODO: Make this dynamically set values to -1 for each Role enum.
  const result: Map<Role, number> = new Map<Role, number>();

  if (limits != null) {
    for (const [key, value] of Object.entries(limits)) {
      result.set(<Role>key, value);
    }
  }

  return result;
}

/**
 * Returns a Region if it is a valid Region.
 * @param {string} str string to check if it is a valid Region.
 * @return {Region | null} Region enum.
 */
function getValidRegion(str: string): Region | null {
  let region: Region;

  if (Object.values(Region).some((reg: string) => reg === str)) {
    region = <Region>str;
  } else {
    return null;
  }

  return region;
}

// /**
//  * Returns a Region if it is a valid Region.
//  * @param {string} str string to check if it is a valid Region.
//  * @return {Player[][] | null} 2D array of players or null.
//  */
// function parsePlayers(str: any): Player[][] | null {
//   let region: Region;

//   if (Object.values(Region).some((reg: string) => reg === str)) {
//     region = <Region>str;
//   } else {
//     return null;
//   }

//   return region;
// }

export { parseLimit, getValidRegion };
