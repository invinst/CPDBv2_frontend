exports.command = function (distance, callback) {
  this.execute('scrollTo(0,' + distance + ')');
  return this;
};
