import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | balances', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:balances');
    assert.ok(route);
  });
});
