import { Router, Request, Response } from 'express';
import { DataSnapshot } from '@firebase/database-types';

import { App } from '../firebase';
import { Region } from '../models/region';
import { Roster } from '../models/roster';
import { Role } from '../models/role';
import { Player } from '../models/player';

const router = Router();
const db = App.database();

/**
 * Returns the current siege roster for a given region.
 */
router.post('/', (req: Request, res: Response) => {
  // ?. is called optional chaining.
  let regionString = req.body.region?.toUpperCase();

  let region: Region;
  if (Object.values(Region).some((reg: string) => reg === regionString)) {
    region = <Region>regionString;
  } else {
    res.status(400).send({
      msg: 'Incorrect region name!',
    });
    return;
  }

  // Firebase doesn't offer descending order. Need to reverse the output.
  const ref = db.ref('/roster').child(region);
  ref
    .once('value')
    .then((snapshot: DataSnapshot) => {
      res.status(200).send(snapshot.val());
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

/**
 * Creates an empty siege roster for a given region.
 */
router.post('/', (req: Request, res: Response) => {
  // ?. is called optional chaining.
  let regionString = req.body.region?.toUpperCase();

  let region: Region;
  if (Object.values(Region).some((reg: string) => reg === regionString)) {
    region = <Region>regionString;
  } else {
    res.status(400).send({
      msg: 'Incorrect region name!',
    });
    return;
  }

  let limitJson: any = req.body.limit;
  let players: Player[][] = new Array(10).map(() => new Array());

  const roster: Roster = new Roster(region, parseLimit(limitJson), players);

  const ref = db.ref('/roster').child(region);
  ref
    .push(roster)
    .then(() => {
      res.status(200).send({ msg: 'Success!' });
      return;
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send();
    });
});

function parseLimit(limit: any): Record<Role, number> {
  let result: Record<Role, number> = {
    [Role.MELEE]: -1,
    [Role.HEALER]: -1,
    [Role.RANGE]: -1,
    [Role.MAGE]: -1,
    [Role.SIEGE]: -1,
  };

  for (let obj in Role) {
    let val: number = limit[obj];
    if (val && val <= 50 && val >= -1) {
      result[<Role>obj] = val;
    }
  }

  return result;
}

const RosterRouter: Router = router;

export { RosterRouter };
