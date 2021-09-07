import fc from 'fast-check';
import { chunk, makeTeams, shuffle } from './makeTeams';

it('should chunk input to n size chunks', () => {
  fc.assert(
    fc.property(fc.integer(1, 100), fc.array(fc.integer()), (n, arr) => {
      const chunks = chunk(n)(arr);
      expect(chunks.length).toEqual(n);
      expect(chunks.flat().length).toEqual(arr.length);
    }),
  );
});

it('make teams should hold the same property', () => {
  fc.assert(
    fc.property(
      fc.array(fc.string()),
      fc.integer(1, 100),
      (participants, numTeams) => {
        const teams = makeTeams(participants, numTeams);
        expect(teams.length).toEqual(numTeams);
        expect(teams.flatMap((t) => t.participants).length).toEqual(
          participants.length,
        );
        teams.forEach((team, index) => {
          expect(team.name).toBe('Tiimi ' + index);
        });
      },
    ),
  );
});

it('shuffle should hold the array length', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) =>
      expect(shuffle(arr).length).toEqual(arr.length),
    ),
  );
});
