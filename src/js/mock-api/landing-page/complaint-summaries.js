import { RawComplaintSummaryFactory } from 'utils/test/factories/complaint';


export default (batch) => RawComplaintSummaryFactory.buildList(batch || 40);
