import * as fs from 'fs';

import {Team, Teams} from '../teams';
import {GEN} from './data';

const readTeam = (file: string) => fs.readFileSync(`${__dirname}/fixtures/${file}`, 'utf8');
const TEAM: string = readTeam('team');
const TEAMS: string = readTeam('teams');

describe('Team', () => {
  test('importTeam + exportTeam', () => {
    const t = Team.fromString(TEAM)!;
    expect(t.toString()).toEqual(TEAM);
    expect(Teams.exportTeams([t]))
        .toEqual('=== Untitled 1 ===\n\n' + TEAM + '\n');
  });

  test('pack + unpack', () => {
    const u = Team.import((Team.import(TEAM)!.pack()) + '\n')!;
    expect(u.export()).toEqual(TEAM);
  });

  test('bad format', () => {
    const t = new Team([], GEN(8), 'uu');
    expect(t.gen).toBe(6);
  });

  test('toJSON + fromJSON', () => {
    const fj = Team.unpack(Team.import(TEAM)!.toJSON())!;
    expect(fj.export()).toEqual(TEAM);

    expect(Team.fromJSON('{"foo": "bar"}')).not.toBeDefined();
  });
});

describe('Teams', () => {
  test('importTeams + exportTeams', () => {
    let imported = Teams.fromString(TEAMS.replace(/\[ou\]/, ''), GEN(8))!;
    expect(imported[0].gen).toBe(8);

    imported = Teams.fromString(TEAMS, GEN(8))!;
    expect(imported.length).toBe(2);

    expect(imported[0].gen).toBe(6);
    expect(imported[0].name).toBe('Bulky Offense');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen).toBe(1);
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(Teams.toString(imported))
        .toEqual(TEAMS.replace(/\[ou\]/, '[gen6ou]'));
    expect(Teams.importTeam('')).not.toBeDefined();

    expect(Teams.importTeam(TEAMS)).toEqual(imported[0]);
  });

  test('unpack', () => {
    expect(Teams.unpackTeam('')).not.toBeDefined();
    expect(Teams.unpackTeam('foo')).not.toBeDefined();
    expect(Teams.importTeams('|\n\n\n')).toEqual([]);
  });

  test('including packed', () => {
    const teams = Teams.importTeams(TEAMS);
    const team = Team.import(TEAM)!;
    let both = 'ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    let imported = Teams.importTeams(both);
    expect(imported[0].gen).toBe(6);

    both = 'gen1ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    imported = Teams.importTeams(both);
    expect(imported.length).toBe(3);

    expect(imported[0].team.length).toBe(6);
    expect(imported[1].team.length).toBe(6);
    expect(imported[2].team.length).toBe(6);

    expect(imported[0].gen).toBe(1);
    expect(imported[0].name).toBe('Cloyster');
    expect(imported[0].folder).toBe('RBY');

    expect(imported[2].export()).toBe(TEAM);

    const again = Teams.importTeams(team.pack());
    expect(again[0].export()).toBe(TEAM);
  });
});