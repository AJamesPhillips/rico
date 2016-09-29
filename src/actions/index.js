import * as crops from './crops';
import * as boards from './boards';
import * as jobs from './jobs';
import * as turns from './turns';

const actions = {
  ...crops,
  ...boards,
  ...jobs,
  ...turns
};

export default actions;
