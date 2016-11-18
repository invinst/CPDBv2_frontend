import { CompositeDecorator } from 'draft-js';

import Link, { findLinkEntities } from 'components/inline-editable/rich-text-editor/entities/link';


export default new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);
