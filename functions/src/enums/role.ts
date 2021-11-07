/**
 * Class for Role.
 */

enum Role {
  MELEE = 'MELEE',
  HEALER = 'HEALER',
  RANGE = 'RANGE',
  MAGE = 'MAGE',
  SIEGE = 'SIEGE',
}

interface RoleLimitJson {
  MELEE: number | null;
  HEALER: number | null;
  RANGE: number | null;
  MAGE: number | null;
  SIEGE: number | null;
}

export { Role, RoleLimitJson };
