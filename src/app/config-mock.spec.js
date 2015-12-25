/**
 * @name configMock
 *
 * @description
 * Simple module that will setup the CONFIG value object from src/assets/json/tenant/cgsdemo/config.json.
 * The CONFIG value object is implicity setup upon bootstrap of the app in index.html.
 *
 * If your test needs CONFIG, you may receive the error:
 *  Unknown provider: CONFIGProvider <- CONFIG
 *
 * Simply include this module to create the CONFIG value object, e.g.:
 *   beforeEach(function() {
 *     module('configMock');
 *     module('YOUR_TEST_MODULE');
 *   });
 *
 */

'use strict';

angular.module('configMock', [
    'src/assets/json/tenant/cgsdemo/config.json'
  ])
  .value('CONFIG', {})
  .run(['srcAssetsJsonTenantCgsdemoConfig', 'CONFIG',
    function(srcAssetsJsonTenantCgsdemoConfig, CONFIG) {
      angular.extend(CONFIG, srcAssetsJsonTenantCgsdemoConfig);
    }
  ]);
