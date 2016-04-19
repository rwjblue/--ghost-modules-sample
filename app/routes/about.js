import Ember from 'ember';
import AuthenticatedRoute from 'ghost/routes/authenticated';
import styleBody from 'ghost/mixins/style-body';

const {
    inject: {service}
} = Ember;

export default AuthenticatedRoute.extend(styleBody, {
    titleToken: 'About',

    classNames: ['view-about'],

    ghostPaths: service(),
    ajax: service(),

    cachedConfig: false,

    model() {
        let cachedConfig = this.get('cachedConfig');
        let configUrl = this.get('ghostPaths.url').api('configuration', 'about');

        if (cachedConfig) {
            return cachedConfig;
        }

        return this.get('ajax').request(configUrl)
            .then((configurationResponse) => {
                let [cachedConfig] = configurationResponse.configuration;

                this.set('cachedConfig', cachedConfig);

                return cachedConfig;
            });
    }
});
