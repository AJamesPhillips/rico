import * as crops from './crops';
import * as boards from './boards';

const actions = {
  ...crops,
  ...boards
};
console.log(actions, crops);
export default actions;
