import * as crops from './crops';
import * as boards from './boards';
import * as jobs from './jobs';
import * as turns from './turns';
import * as buildings from './buildings';

const actions = {
  ...crops,
  ...boards,
  ...jobs,
  ...turns,
  ...buildings
};

export default actions;
