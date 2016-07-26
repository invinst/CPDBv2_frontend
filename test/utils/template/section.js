import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE, SOLID_TEMPLATE } from 'utils/constants';
import { wildSandColor } from 'utils/styles';


describe('SectionTemplate', function () {
  it('should return correct style based on template', function () {
    let template = SectionTemplate(BASE_TEMPLATE);
    template.wrapper.backgroundColor.should.equal('white');
    template.header.backgroundColor.should.equal('white');
    template.content.backgroundColor.should.equal('white');

    template = SectionTemplate(SOLID_TEMPLATE);
    template.wrapper.backgroundColor.should.equal(wildSandColor);
    template.header.backgroundColor.should.equal(wildSandColor);
    template.content.backgroundColor.should.equal(wildSandColor);
  });
});
