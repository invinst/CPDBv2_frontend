#!/usr/bin/env bash
DIR=$1

find $DIR -type f -name \*.js -exec sed -i '' -E "2i \\
import { shallow } from 'enzyme';\\
" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/import .* from 'utils\/test';/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/let (instance|element);/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/from 'react-dom';/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/import .* from 'react-addons-test-utils';/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/import { renderIntoDocument } from 'react-addons-test-utils';/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "/unmountComponentSuppressError\((instance|element)\);/d" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/(instance|element) = renderIntoDocument\(/const wrapper = shallow(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/findRenderedDOMComponentWithClass\((instance|element), '/wrapper.find('./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/scryRenderedDOMComponentsWithClass\((instance|element), '/wrapper.find('./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/findRenderedComponentWithType\((instance|element), /wrapper.find(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/scryRenderedComponentsWithType\((instance|element), /wrapper.find(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/findRenderedDOMComponentWithTag\((instance|element), /wrapper.find(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/scryRenderedDOMComponentsWithTag\((instance|element), /wrapper.find(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.props\.([a-zA-Z0-9_]+)\./.prop('\1')./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.props\.([a-zA-Z0-9_]+)\(/.prop('\1')(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.prop\('should'\)\./.props().should./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.state\.([a-zA-Z0-9_]+)\./.state('\1')./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\[([0-9]+)\]([\.;])/.at(\1)\2/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.textContent\./.text()./g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/(\.find\([a-zA-Z0-9]+\))\.should\.have\.length\(0\);/\1.exists().should.be.false();/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/(^ +[a-zA-Z0-9]+\.find\([^)]+\));/\1.exists().should.be.true();/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/(instance|element) = renderWithContext\(([a-zA-z0-9]+), (.+)\);$/const wrapper = shallow(\3, { context: \2 });/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/Simulate\.([a-zA-z0-9]+)\(([a-zA-z0-9]+)(.*)$/\2.simulate('\1'\3/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.className.should.containEql\((.*)\);$/.hasClass(\1).should.be.true();/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.className.should.not.containEql\((.*)\);$/.hasClass(\1).should.be.false();/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.className.should./.prop('className').should./g" {} \;

find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.eql\('/.equal('/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/\.eql\(([0-9])/.equal(\1/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/should\.be\.equal\(/should.equal(/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.calledWith\((.*)).should.be.true\(\)/.should.be.calledWith(\1)/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.calledWith\((.*)).should.be.false\(\)/.should.not.be.calledWith(\1)/g" {} \;
find $DIR -type f -name \*.js -exec sed -i '' -E "s/.called.should.be.true\(\)/.should.be.called()/g" {} \;
