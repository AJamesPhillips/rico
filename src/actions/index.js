import * as crops from './crops';
import * as boards from './boards';
import * as jobs from './jobs';
import * as turns from './turns';
import * as buildings from './buildings';
import * as colonists from './colonists';
import * as craftSupply from './craftSupply';

const actions = {
  ...crops,
  ...boards,
  ...jobs,
  ...turns,
  ...buildings,
  ...colonists,
  ...craftSupply
};

export default actions;
