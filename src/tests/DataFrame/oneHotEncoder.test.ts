import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame One Hot Encoder', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 'a' },
      { col1: 2, col2: 'b' },
      { col1: 3, col2: 'c' },
      { col1: 4, col2: 'd' },
      { col1: 5, col2: 'e' },
      { col1: 6, col2: 'a' },
      { col1: 7, col2: 'c' },
      { col1: 8, col2: 'd' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(df.oneHotEncoder('col2').rows).toEqual([
    { col1: 1, col2_a: 1, col2_b: 0, col2_c: 0, col2_d: 0, col2_e: 0 },
    { col1: 2, col2_a: 0, col2_b: 1, col2_c: 0, col2_d: 0, col2_e: 0 },
    { col1: 3, col2_a: 0, col2_b: 0, col2_c: 1, col2_d: 0, col2_e: 0 },
    { col1: 4, col2_a: 0, col2_b: 0, col2_c: 0, col2_d: 1, col2_e: 0 },
    { col1: 5, col2_a: 0, col2_b: 0, col2_c: 0, col2_d: 0, col2_e: 1 },
    { col1: 6, col2_a: 1, col2_b: 0, col2_c: 0, col2_d: 0, col2_e: 0 },
    { col1: 7, col2_a: 0, col2_b: 0, col2_c: 1, col2_d: 0, col2_e: 0 },
    { col1: 8, col2_a: 0, col2_b: 0, col2_c: 0, col2_d: 1, col2_e: 0 },
  ]);
});

