import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame sort', () => {
  const df = new DataFrame(
    [
      { col1: 10, col2: 'a' },
      { col1: 26, col2: 'b' },
      { col1: 3, col2: 'z' },
      { col1: 300, col2: 'x' },
      { col1: 30, col2: 'm' },
      { col1: 42, col2: 'c' },
      { col1: 43, col2: 'h' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(df.sort('col1').rows).toEqual([
    { col1: 3, col2: 'z' },
    { col1: 10, col2: 'a' },
    { col1: 26, col2: 'b' },
    { col1: 30, col2: 'm' },
    { col1: 42, col2: 'c' },
    { col1: 43, col2: 'h' },
    { col1: 300, col2: 'x' },
  ]);

  expect(df.sort('col1', 'desc').rows).toEqual([
    { col1: 300, col2: 'x' },
    { col1: 43, col2: 'h' },
    { col1: 42, col2: 'c' },
    { col1: 30, col2: 'm' },
    { col1: 26, col2: 'b' },
    { col1: 10, col2: 'a' },
    { col1: 3, col2: 'z' },
  ]);

  expect(df.sort('col2').rows).toEqual([
    { col1: 10, col2: 'a' },
    { col1: 26, col2: 'b' },
    { col1: 42, col2: 'c' },
    { col1: 43, col2: 'h' },
    { col1: 30, col2: 'm' },
    { col1: 300, col2: 'x' },
    { col1: 3, col2: 'z' },
  ]);

  expect(df.sort('col2', 'desc').rows).toEqual([
    { col1: 3, col2: 'z' },
    { col1: 300, col2: 'x' },
    { col1: 30, col2: 'm' },
    { col1: 43, col2: 'h' },
    { col1: 42, col2: 'c' },
    { col1: 26, col2: 'b' },
    { col1: 10, col2: 'a' },
  ]);
});

