import React, { Component } from 'react';
import DocumentCard from './document-card';
import Carousel from 'components/common/carousel';
import _ from 'lodash';

export default class RecentDocument extends Component {

  componentDidMount() {

  }

  render() {

    const dummyDocuments = _.range(6).map((idx) => {
      return (
        <DocumentCard key={ idx }/>
      );
    });

    const descriptionText = (
      <div>
        <p>We often update our complaint records as we recieve more information from the City.</p>
        <p>Here are some of the recent updates.</p>
      </div>
    );


    return (
      <div className='test--recent-document'>
        <Carousel slides={ dummyDocuments } header='New Documents' description={ descriptionText }/>
      </div>
    );
  }
}
