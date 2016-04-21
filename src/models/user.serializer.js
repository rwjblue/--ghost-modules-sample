import Ember from 'ember';
import ApplicationSerializer from 'ghost/serializers/application';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
    attrs: {
        roles: {embedded: 'always'}
    },

    extractSingle(store, primaryType, payload) {
        let root = this.keyForAttribute(primaryType.modelName);
        let pluralizedRoot = Ember.String.pluralize(primaryType.modelName);

        payload[root] = payload[pluralizedRoot][0];
        delete payload[pluralizedRoot];

        return this._super(...arguments);
    },

    normalizeSingleResponse(store, primaryModelClass, payload) {
        let root = this.keyForAttribute(primaryModelClass.modelName);
        let pluralizedRoot = Ember.String.pluralize(primaryModelClass.modelName);

        payload[root] = payload[pluralizedRoot][0];
        delete payload[pluralizedRoot];

        return this._super(...arguments);
    }
});
