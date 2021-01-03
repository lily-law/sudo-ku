import React from 'react'
import renderer from 'react-test-renderer'
import Cell from './Cell'
import Grid from '@lilylaw/grid'

test('', () => {
  const grid = new Grid({columns: 9, rows: 9, blockSize: { width: 3 } });
  const component = renderer.create(
    <Cell cell={cell} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});