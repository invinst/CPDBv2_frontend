import { sectionWrapperStyle, headerStyle, contentStyle } from './section.style';


export default function SectionTemplate(template) {
  return {
    wrapper: sectionWrapperStyle[template],
    header: headerStyle[template],
    content: contentStyle[template]
  };
}
