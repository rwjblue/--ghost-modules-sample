import Ember from 'ember';

const {HistoryLocation} = Ember;

let trailingHistory = HistoryLocation.extend({
    formatURL() {
        return this._super(...arguments).replace(/\/?$/, '/');
    }
});

export default {
    name: 'registerTrailingLocationHistory',

    initialize(application) {
        application.register('location:trailing-history', trailingHistory);
    }
};
