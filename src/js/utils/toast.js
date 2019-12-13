import { browserHistory } from 'react-router';
import pluralize from 'pluralize';
import { get, identity } from 'lodash';
import cx from 'classnames';

import { Toastify } from 'utils/vendors';
import toastStyles from './toast.sass';
import { generatePinboardUrl } from 'utils/pinboard';

function formatMessage(foundIds, notFoundIds, itemType) {
  let message = '';
  if (!notFoundIds.length)
    return '';

  const total = foundIds.length + notFoundIds.length;
  if (foundIds.length) {
    message += ` ${ foundIds.length } out of ${ total } ${ total === 1 ? itemType : `${ itemType }s` } ` +
      'were added to this pinboard.';
  }
  message += ` ${ notFoundIds.length } out of ${ total } ${ itemType } ${ total === 1 ? 'ID' : 'IDs' } ` +
    `could not be recognized (${ notFoundIds.join(', ') }).`;
  return message.trim();
}

const formatInvalidParamMessage = (invalidParams) =>
  `${ invalidParams.join(', ') } ${ pluralize('is', invalidParams.length) } not recognized.`;

const TopRightTransition = Toastify.cssTransition({
  enter: 'toast-enter',
  exit: 'toast-exit',
  duration: 500,
  appendPosition: true,
});

export const showPinboardToast = (message) => Toastify.toast(message, {
  className: toastStyles.pinboardPageToast,
  transition: TopRightTransition,
  autoClose: false,
});

export const showNotAutoCloseToast = (message, onClick) => Toastify.toast(message, {
  className: toastStyles.fixedWidthToast,
  transition: TopRightTransition,
  autoClose: false,
  draggable: false,
  onClick,
});

export function showCreatedToasts(pinboardSavingResponse) {
  const foundOfficerIds = get(pinboardSavingResponse, 'officer_ids', []);
  const foundCrids = get(pinboardSavingResponse, 'crids', []);
  const foundTrrIds = get(pinboardSavingResponse, 'trr_ids', []);

  const notFoundOfficerIds = get(pinboardSavingResponse, 'not_found_items.officer_ids', []);
  const notFoundCrids = get(pinboardSavingResponse, 'not_found_items.crids', []);
  const notFoundTrrIds = get(pinboardSavingResponse, 'not_found_items.trr_ids', []);

  const creatingMessages = [];
  creatingMessages.push(formatMessage(foundOfficerIds, notFoundOfficerIds, 'officer'));
  creatingMessages.push(formatMessage(foundCrids, notFoundCrids, 'allegation'));
  creatingMessages.push(formatMessage(foundTrrIds, notFoundTrrIds, 'TRR'));

  creatingMessages.filter(identity).forEach(showPinboardToast);
}

const TOAST_TYPE_MAP = {
  'CR': 'CR',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'OFFICER': 'Officer',
  'UNIT > OFFICERS': 'Officer',
  'DATE > OFFICERS': 'Officer',
  'TRR': 'TRR',
  'DATE > TRR': 'TRR',
};

export function showAddOrRemoveItemToast(pinboard, isPinned, type) {
  const actionType = isPinned ? 'removed' : 'added';
  const url = generatePinboardUrl(pinboard) || '/pinboard/';

  Toastify.toast(`${ TOAST_TYPE_MAP[type] } ${ actionType }`, {
    className: cx(toastStyles.toastWrapper, actionType),
    transition: TopRightTransition,
    onClick: () => browserHistory.push(url),
  });
}

export const showInvalidParamToasts = invalidParams => showPinboardToast(formatInvalidParamMessage(invalidParams));
