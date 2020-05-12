import { createAction } from 'redux-actions';

import {
  VISIT_PIN_BUTTON_INTRODUCTION,
  VISIT_PINBOARD_BUTTON_INTRODUCTION,
  VISIT_PINBOARD_INTRODUCTION,
} from 'utils/constants';


export const visitPinButtonIntroduction = createAction(VISIT_PIN_BUTTON_INTRODUCTION);
export const visitPinboardButtonIntroduction = createAction(VISIT_PINBOARD_BUTTON_INTRODUCTION);
export const visitPinboardIntroduction = createAction(VISIT_PINBOARD_INTRODUCTION);
