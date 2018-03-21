if (!global.String.prototype.startsWith) {
  /* istanbul ignore next */
  global.String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
