import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty, every, noop } from 'lodash';

import styles from './relevant-section.sass';
import RelevantDocuments from './relevant-documents';
import RelevantCoaccusals from './relevant-coaccusals';
import RelevantComplaints from './relevant-complaints';


export default function RelevantSection(props) {
  const {
    pinboardId,
    documents,
    coaccusals,
    complaints,
    documentHasMore,
    coaccusalHasMore,
    complaintHasMore,
    documentNextParams,
    coaccusalNextParams,
    complaintNextParams,
    fetchPinboardRelevantDocuments,
    fetchPinboardRelevantCoaccusals,
    fetchPinboardRelevantComplaints,
    addItemInPinboardPage,
    isRequestingDocuments,
    isRequestingCoaccusals,
    isRequestingComplaints,
    focusItem,
  } = props;

  if (
    every([!isRequestingDocuments, !isRequestingCoaccusals, !isRequestingComplaints]) &&
    every([documents, coaccusals, complaints].map(isEmpty))
  )
    return null;

  return (
    <div className={ styles.relevantSection }>
      <div className='relevant-title'>Relevant</div>
      <RelevantDocuments
        pinboardId={ pinboardId }
        documents={ documents }
        nextParams={ documentNextParams }
        hasMore={ documentHasMore }
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingDocuments }
        focusItem={ focusItem }
      />
      <RelevantCoaccusals
        pinboardId={ pinboardId }
        coaccusals={ coaccusals }
        nextParams={ coaccusalNextParams }
        hasMore={ coaccusalHasMore }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingCoaccusals }
        focusItem={ focusItem }
      />
      <RelevantComplaints
        pinboardId={ pinboardId }
        complaints={ complaints }
        nextParams={ complaintNextParams }
        hasMore={ complaintHasMore }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        addItemInPinboardPage={ addItemInPinboardPage }
        requesting={ isRequestingComplaints }
        focusItem={ focusItem }
      />
    </div>
  );
}

RelevantSection.propTypes = {
  pinboardId: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.object),
  coaccusals: PropTypes.arrayOf(PropTypes.object),
  complaints: PropTypes.arrayOf(PropTypes.object),
  documentHasMore: PropTypes.bool,
  coaccusalHasMore: PropTypes.bool,
  complaintHasMore: PropTypes.bool,
  documentNextParams: PropTypes.object,
  coaccusalNextParams: PropTypes.object,
  complaintNextParams: PropTypes.object,
  fetchPinboardRelevantDocuments: PropTypes.func,
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  fetchPinboardRelevantComplaints: PropTypes.func,
  addItemInPinboardPage: PropTypes.func,
  isRequestingDocuments: PropTypes.bool,
  isRequestingCoaccusals: PropTypes.bool,
  isRequestingComplaints: PropTypes.bool,
  focusItem: PropTypes.func,

};

RelevantSection.defaultProps = {
  fetchPinboardRelevantDocuments: noop,
  fetchPinboardRelevantCoaccusals: noop,
  fetchPinboardRelevantComplaints: noop,
  focusItem: noop,
};

