import { getToasts, hasToastsSelector } from 'selectors/toast';


describe('toast selector', function () {
  describe('getToasts selector', function () {
    it('should return toasts', function () {
      const state = {
        toasts: [
          {
            name: 'CR',
            template: 'This is CR toast template',
          },
          {
            name: 'TRR',
            template: 'This is CR toast template',
          },
        ],
      };
      getToasts(state).should.eql([
        {
          name: 'CR',
          template: 'This is CR toast template',
        },
        {
          name: 'TRR',
          template: 'This is CR toast template',
        },
      ]);
    });
  });

  describe('hasToastsSelector', function () {
    it('should return true if toasts already exists', function () {
      const state = {
        toasts: [
          {
            name: 'CR',
            template: 'This is CR toast template',
          },
          {
            name: 'TRR',
            template: 'This is CR toast template',
          },
        ],
      };
      hasToastsSelector(state).should.be.true();
    });

    it('should return false if there is no toasts', function () {
      const state = {
        toasts: [],
      };
      hasToastsSelector(state).should.be.false();
    });
  });
});
