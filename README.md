[![Build Status](https://api.travis-ci.org/kyle-burke/rico.svg?branch=master)](https://api.travis-ci.org/kyle-burke/rico)
[![codecov](https://codecov.io/gh/kyle-burke/rico/branch/master/graph/badge.svg)](https://codecov.io/gh/kyle-burke/rico)

Learning the React+Redux stack and appreciating the nuance of beloved board game Puerto Rico.

#### Testing
Testing is a mess right now. I'm using `expect` for testing reducers and actions, and using its `createSpy` method in
conjunction with `chai` and `chai-enzyme` to test React components. I could drop `expect` and replace it with `sinon`
for the spies and use `chai` in my reducer/action tests.
