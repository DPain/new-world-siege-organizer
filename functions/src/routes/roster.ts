import { Router, Request, Response } from 'express';
import { DataSnapshot } from '@firebase/database-types';

import { App } from '../firebase';
import { Region } from '../enums/region';
import { Roster } from '../models/roster';
import { Player } from '../models/player';
import { Role } from '../enums/role';
import { getValidRegion, parseLimit } from '../util/util';
import { MAX_LENGTH_2D, MAX_LENGTH_INNER } from '../const';

const router = Router();
const db = App.database();

/**
 * Returns the current siege roster for a given region.
 */
router.get('/:region', (req: Request, res: Response) => {
  // ?. is called optional chaining.
  const regionString = req.params.region?.toUpperCase();

  const region: Region | null = getValidRegion(regionString);
  if (!region) {
    res.status(400).send({
      msg: 'Incorrect region name!',
    });
    return;
  }

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
  const regionString = req.body.region?.toUpperCase();

  const region: Region | null = getValidRegion(regionString);
  if (!region) {
    res.status(400).send({
      msg: 'Incorrect region name!',
    });
    return;
  }

  // Generating map input for parseLimit helper function.
  const limit: Map<Role, number> = parseLimit(req.body.limit);
  const players: Player[][] = [[]];

  const roster: Roster = new Roster(region, limit, players);

  const ref = db.ref('/roster').child(region);
  ref
    .set(roster.toJson())
    .then(() => {
      res.status(200).send({ msg: 'Success!' });
      return;
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send();
    });
});

/**
 * Updates the region's details.
 * Available changes are: players, limit
 */
router.post('/:region', (req: Request, res: Response) => {
  // ?. is called optional chaining.
  const regionString = req.params.region?.toUpperCase();
  const newPlayers: any[][] = req.body.players;
  const newLimit = req.body.limit;

  // Handles region param.
  const region: Region | null = getValidRegion(regionString);
  if (!region) {
    res.status(400).send({
      msg: 'Incorrect region name!',
    });
    return;
  }

  // Handles players field.
  let players: Player[][];
  if (newPlayers) {
    players = newPlayers.slice(0, MAX_LENGTH_2D).map((arr) =>
      arr.slice(0, MAX_LENGTH_INNER).map((el) => {
        const entry: Player = Player.fromJson(el);
        return entry;
      })
    );
  } else {
    players = [[]];
  }

  let limit: Map<Role, number>;
  if (newLimit) {
    // Handles limit field.
    limit = parseLimit(req.body.limit);
  } else {
    limit = new Map<Role, number>();
  }

  const roster: Roster = new Roster(region, limit, players);

  const ref = db.ref('/roster').child(region);
  ref
    .update(roster.toJson())
    .then(() => {
      res.status(200).send({ msg: 'Success!' });
      return;
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send();
    });
});

const RosterRouter: Router = router;

export { RosterRouter };
