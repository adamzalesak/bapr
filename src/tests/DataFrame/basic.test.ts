import { DataFrame } from '../../DataFrame/DataFrame';

test('basic DataFrame tests', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 'a' },
      { col1: 2, col2: 'b' },
      { col1: 3, col2: 'c' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(df).toBeInstanceOf(DataFrame);

  expect(df.columns).toEqual([
    { name: 'col1', type: 'number' },
    { name: 'col2', type: 'string' },
  ]);

  expect(df.rows).toEqual([
    { col1: 1, col2: 'a' },
    { col1: 2, col2: 'b' },
    { col1: 3, col2: 'c' },
  ]);

  expect(df.count).toBe(3);

  expect(df.slice(1, 2).rows).toEqual([
    { col1: 1, col2: 'a' },
    { col1: 2, col2: 'b' },
  ]);
});

