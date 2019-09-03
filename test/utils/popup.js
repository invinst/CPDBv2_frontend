import { generatePopupId } from 'utils/popup';

describe('generatePopupId', function () {
  it('should generate random popup id', function () {
    const id1 = generatePopupId();
    const id2 = generatePopupId();

    id1.should.containEql('tooltip-');
    id2.should.containEql('tooltip-');
    id1.should.not.eql(id2);
  });
});
