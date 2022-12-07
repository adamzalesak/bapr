import { DataFrame } from '../../DataFrame/DataFrame';

test('DataFrame filter', () => {
  const df = new DataFrame(
    [
      { col1: 1, col2: 'abcdefgh' },
      { col1: 2, col2: 'foo' },
      { col1: 3, col2: 'bar' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(df.filter('col1', 'EQUAL', '2').rows).toEqual([{ col1: 2, col2: 'foo' }]);
  expect(df.filter('col1', 'NOT_EQUAL', '2').rows).toEqual([
    { col1: 1, col2: 'abcdefgh' },
    { col1: 3, col2: 'bar' },
  ]);
  expect(df.filter('col1', 'GREATER_THAN', '2').rows).toEqual([{ col1: 3, col2: 'bar' }]);
  expect(df.filter('col1', 'GREATER_THAN_OR_EQUAL', '2').rows).toEqual([
    { col1: 2, col2: 'foo' },
    { col1: 3, col2: 'bar' },
  ]);
  expect(df.filter('col1', 'LESS_THAN', '2').rows).toEqual([{ col1: 1, col2: 'abcdefgh' }]);
  expect(df.filter('col1', 'LESS_THAN_OR_EQUAL', '2').rows).toEqual([
    { col1: 1, col2: 'abcdefgh' },
    { col1: 2, col2: 'foo' },
  ]);

  expect(df.filter('col2', 'EQUAL', 'foo').rows).toEqual([{ col1: 2, col2: 'foo' }]);
  expect(df.filter('col2', 'NOT_EQUAL', 'foo').rows).toEqual([
    { col1: 1, col2: 'abcdefgh' },
    { col1: 3, col2: 'bar' },
  ]);
  expect(df.filter('col2', 'CONTAINS', 'cde').rows).toEqual([{ col1: 1, col2: 'abcdefgh' }]);
  expect(df.filter('col2', 'NOT_CONTAINS', 'f').rows).toEqual([{ col1: 3, col2: 'bar' }]);
  expect(df.filter('col2', 'STARTS_WITH', 'f').rows).toEqual([{ col1: 2, col2: 'foo' }]);
  expect(df.filter('col2', 'ENDS_WITH', 'h').rows).toEqual([{ col1: 1, col2: 'abcdefgh' }]);
  expect(df.filter('col2', 'MATCHES_REGEX', '^a[a-zA-Z]*de').rows).toEqual([
    { col1: 1, col2: 'abcdefgh' },
  ]);
});

