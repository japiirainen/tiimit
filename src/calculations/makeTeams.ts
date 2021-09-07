import { pipe, range, mapWithIndex } from 'iiris';

export const makeTeams = (
  participants: string[],
  numTeams: number,
): { name: string; participants: string[] }[] => {
  const shuffledPs = pipe(participants, shuffle, chunk(numTeams));
  return pipe(
    range(0, numTeams),
    mapWithIndex((i, p) => ({
      name: `Tiimi ${i}`,
      participants: shuffledPs[p],
    })),
  );
};

export const chunk =
  (chunks: number) =>
  <T>(arr: T[]): T[][] =>
    arr.reduce((acc, item, index) => {
      acc[index % chunks].push(item);
      return acc;
    }, Array.from(Array(chunks), () => []) as T[][]);

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
