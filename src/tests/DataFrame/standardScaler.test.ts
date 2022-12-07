import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame Standard Scaler', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 10 },
      { col1: 2, col2: 20 },
      { col1: 3, col2: 30 },
      { col1: 4, col2: 40 },
      { col1: 5, col2: 50 },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'number' },
    ],
  );

  expect(df.standardScaler('col2', true, true).rows).toEqual([
    { col1: 1, col2: -1.414213562373095 },
    { col1: 2, col2: -0.7071067811865475 },
    { col1: 3, col2: 0 },
    { col1: 4, col2: 0.7071067811865475 },
    { col1: 5, col2: 1.414213562373095 },
  ]);
});

