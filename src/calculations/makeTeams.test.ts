import fc from 'fast-check';
import { chunk, makeTeams } from './makeTeams';

describe('chunk', () => {
  it('should chunk input to n size chunks', () => {
    fc.assert(
      fc.property(fc.integer(1, 100), fc.array(fc.integer()), (n, arr) =>
        expect(chunk(n)(arr).length).toEqual(n),
      ),
    );
  });

  it('make teams should hold the same property', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.integer(1, 100),
        (participants, numTeams) =>
          expect(makeTeams(participants, numTeams).length).toEqual(numTeams),
      ),
    );
  });
});
