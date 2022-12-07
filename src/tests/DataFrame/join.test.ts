import { DataFrame } from '../../DataFrame/DataFrame';
import { JoinType } from '../../models/joinNode';

test('DataFrame join', () => {
  const dfA = new DataFrame(
    [
      { col1: 1, col2: 'a' },
      { col1: 2, col2: 'b' },
      { col1: 3, col2: 'c' },
      { col1: 5, col2: 'c' },
      { col1: 1, col2: 'c' },
      { col1: 10, col2: 'c' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  const dfB = new DataFrame(
    [
      { col3: 10, col4: 'c' },
      { col3: 2, col4: 'e' },
      { col3: 2, col4: 'd' },
      { col3: 1, col4: 'b' },
      { col3: 1, col4: 'a' },
      { col3: 3, col4: 'z' },
      { col3: 3, col4: 'y' },
      { col3: 6, col4: 'x' },
    ],
    [
      { name: 'col3', type: 'number' },
      { name: 'col4', type: 'string' },
    ],
  );

  expect(dfA.join(dfB, 'col1', 'col3', JoinType.leftOuterJoin).rows).toEqual([
    { col1: 1, col2: 'a', col3: 1, col4: 'b' },
    { col1: 1, col2: 'a', col3: 1, col4: 'a' },
    { col1: 1, col2: 'c', col3: 1, col4: 'b' },
    { col1: 1, col2: 'c', col3: 1, col4: 'a' },
    { col1: 2, col2: 'b', col3: 2, col4: 'e' },
    { col1: 2, col2: 'b', col3: 2, col4: 'd' },
    { col1: 3, col2: 'c', col3: 3, col4: 'z' },
    { col1: 3, col2: 'c', col3: 3, col4: 'y' },
    { col1: 5, col2: 'c', col3: null, col4: null },
    { col1: 10, col2: 'c', col3: 10, col4: 'c' },
  ]);
  expect(dfA.join(dfB, 'col1', 'col3', JoinType.leftOuterJoin).columns).toEqual([
    { name: 'col1', type: 'number' },
    { name: 'col2', type: 'string' },
    { name: 'col3', type: 'number' },
    { name: 'col4', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col1', 'col3', JoinType.rightOuterJoin).rows).toEqual([
    { col1: 10, col2: 'c', col3: 10, col4: 'c' },
    { col1: 2, col2: 'b', col3: 2, col4: 'e' },
    { col1: 2, col2: 'b', col3: 2, col4: 'd' },
    { col1: 1, col2: 'a', col3: 1, col4: 'b' },
    { col1: 1, col2: 'c', col3: 1, col4: 'b' },
    { col1: 1, col2: 'a', col3: 1, col4: 'a' },
    { col1: 1, col2: 'c', col3: 1, col4: 'a' },
    { col1: 3, col2: 'c', col3: 3, col4: 'z' },
    { col1: 3, col2: 'c', col3: 3, col4: 'y' },
    { col1: null, col2: null, col3: 6, col4: 'x' },
  ]);
  expect(dfA.join(dfB, 'col1', 'col3', JoinType.rightOuterJoin).columns).toEqual([
    { name: 'col1', type: 'number' },
    { name: 'col2', type: 'string' },
    { name: 'col3', type: 'number' },
    { name: 'col4', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col1', 'col3', JoinType.innerJoin).rows).toEqual([
    { col1: 1, col2: 'a', col3: 1, col4: 'b' },
    { col1: 1, col2: 'a', col3: 1, col4: 'a' },
    { col1: 1, col2: 'c', col3: 1, col4: 'b' },
    { col1: 1, col2: 'c', col3: 1, col4: 'a' },
    { col1: 2, col2: 'b', col3: 2, col4: 'e' },
    { col1: 2, col2: 'b', col3: 2, col4: 'd' },
    { col1: 3, col2: 'c', col3: 3, col4: 'z' },
    { col1: 3, col2: 'c', col3: 3, col4: 'y' },
    { col1: 10, col2: 'c', col3: 10, col4: 'c' },
  ]);
  expect(dfA.join(dfB, 'col1', 'col3', JoinType.innerJoin).columns).toEqual([
    { name: 'col1', type: 'number' },
    { name: 'col2', type: 'string' },
    { name: 'col3', type: 'number' },
    { name: 'col4', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col1', 'col3', JoinType.fullOuterJoin).rows).toEqual([
    { col1: 1, col2: 'a', col3: 1, col4: 'b' },
    { col1: 1, col2: 'a', col3: 1, col4: 'a' },
    { col1: 1, col2: 'c', col3: 1, col4: 'b' },
    { col1: 1, col2: 'c', col3: 1, col4: 'a' },
    { col1: 2, col2: 'b', col3: 2, col4: 'e' },
    { col1: 2, col2: 'b', col3: 2, col4: 'd' },
    { col1: 3, col2: 'c', col3: 3, col4: 'z' },
    { col1: 3, col2: 'c', col3: 3, col4: 'y' },
    { col1: 5, col2: 'c', col3: null, col4: null },
    { col1: 10, col2: 'c', col3: 10, col4: 'c' },
    { col1: null, col2: null, col3: 6, col4: 'x' },
  ]);
  expect(dfA.join(dfB, 'col1', 'col3', JoinType.fullOuterJoin).columns).toEqual([
    { name: 'col1', type: 'number' },
    { name: 'col2', type: 'string' },
    { name: 'col3', type: 'number' },
    { name: 'col4', type: 'string' },
  ]);
});

test('DataFrame join with columns with same name', () => {
  const dfA = new DataFrame(
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

  const dfB = new DataFrame(
    [
      { col1: 1, col2: 'a' },
      { col1: 2, col2: 'a' },
      { col1: 3, col2: 'c' },
    ],
    [
      { name: 'col1', type: 'number' },
      { name: 'col2', type: 'string' },
    ],
  );

  expect(dfA.join(dfB, 'col2', 'col2', JoinType.leftOuterJoin).rows).toEqual([
    { col1_1: 1, col2_1: 'a', col1_2: 1, col2_2: 'a' },
    { col1_1: 1, col2_1: 'a', col1_2: 2, col2_2: 'a' },
    { col1_1: 2, col2_1: 'b', col1_2: null, col2_2: null },
    { col1_1: 3, col2_1: 'c', col1_2: 3, col2_2: 'c' },
  ]);
  expect(dfA.join(dfB, 'col2', 'col2', JoinType.leftOuterJoin).columns).toEqual([
    { name: 'col1_1', type: 'number' },
    { name: 'col2_1', type: 'string' },
    { name: 'col1_2', type: 'number' },
    { name: 'col2_2', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col2', 'col2', JoinType.rightOuterJoin).rows).toEqual([
    { col1_1: 1, col2_1: 'a', col1_2: 1, col2_2: 'a' },
    { col1_1: 1, col2_1: 'a', col1_2: 2, col2_2: 'a' },
    { col1_1: 3, col2_1: 'c', col1_2: 3, col2_2: 'c' },
  ]);
  expect(dfA.join(dfB, 'col2', 'col2', JoinType.rightOuterJoin).columns).toEqual([
    { name: 'col1_1', type: 'number' },
    { name: 'col2_1', type: 'string' },
    { name: 'col1_2', type: 'number' },
    { name: 'col2_2', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col2', 'col2', JoinType.innerJoin).rows).toEqual([
    { col1_1: 1, col2_1: 'a', col1_2: 1, col2_2: 'a' },
    { col1_1: 1, col2_1: 'a', col1_2: 2, col2_2: 'a' },
    { col1_1: 3, col2_1: 'c', col1_2: 3, col2_2: 'c' },
  ]);
  expect(dfA.join(dfB, 'col2', 'col2', JoinType.innerJoin).columns).toEqual([
    { name: 'col1_1', type: 'number' },
    { name: 'col2_1', type: 'string' },
    { name: 'col1_2', type: 'number' },
    { name: 'col2_2', type: 'string' },
  ]);

  expect(dfA.join(dfB, 'col2', 'col2', JoinType.fullOuterJoin).rows).toEqual([
    { col1_1: 1, col2_1: 'a', col1_2: 1, col2_2: 'a' },
    { col1_1: 1, col2_1: 'a', col1_2: 2, col2_2: 'a' },
    { col1_1: 2, col2_1: 'b', col1_2: null, col2_2: null },
    { col1_1: 3, col2_1: 'c', col1_2: 3, col2_2: 'c' },
  ]);
  expect(dfA.join(dfB, 'col2', 'col2', JoinType.fullOuterJoin).columns).toEqual([
    { name: 'col1_1', type: 'number' },
    { name: 'col2_1', type: 'string' },
    { name: 'col1_2', type: 'number' },
    { name: 'col2_2', type: 'string' },
  ]);
});

