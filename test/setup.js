import 'polyfill';
import 'should';
import 'should-sinon';
import 'utils/test/should/React';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
