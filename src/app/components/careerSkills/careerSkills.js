(function() {
  'use strict';

  angular.module('careerSkills', [
    'apolloSkillServices.skilledup',
    'ui.bootstrap.modal',
    'ngTextTruncate',
    'duScroll',
    'LocalStorageModule'
  ])

  .value('careerSkills.config', {
    pageSize: 15,
    facets: ['product.type', 'price'],
    filtersCookieKey: 'careerSkills.filters',
    defaultPriceFilter: '{"min":0,"max":0.01}'
  })

  .controller('CareerSkillsController', [
    'SkilledUp',
    '$uibModal',
    'localStorageService',
    'careerSkills.config',
    function(SkilledUp, $uibModal, localStorageService, config) {
      var vm = this;

      /**
       * Method called to instantiate products modal
       * @param  {String} skill Name of skill for products
       */
      vm.getProducts = function(skill) {

        // used saved value if available
        // TODO consider moving this to shared logic
        //  or pushing this all to modal controller
        //  or passing in filters via resolve
        var savedFilter = (localStorageService.get(config.filtersCookieKey) || {})[skill] || {},
          typeFilter = savedFilter.type || '',
          priceFilter = savedFilter.price || config.defaultPriceFilter,
          priceRange;
        try {
          priceRange = angular.fromJson(priceFilter);
        } catch (e) {
          // do nothing;
        }
        priceRange = priceRange || {};

        return SkilledUp.getProducts({
          q: skill,
          'page.size': config.pageSize,
          'page.number': 0,
          facet: config.facets,
          'product.type.name': typeFilter || undefined,
          'price.min': priceRange.min,
          'price.max': priceRange.max
        }).then(function(results) {
          $uibModal.open({
            templateUrl: 'app/components/careerSkills/careerSkillsModal.html',
            size: 'lg',
            resolve: {
              products: angular.identity.bind(this, results.data),
              keywords: angular.identity.bind(this, skill)
            },
            controller: 'CareerSkillsModalController as csm'
          });
        });
      };
    }
  ])

  .controller('CareerSkillsModalController', [
    'products',
    'keywords',
    '$document',
    '$parse',
    '$filter',
    'SkilledUp',
    'careerSkills.config',
    'localStorageService',
    function(products, keywords, $document, $parse, $filter, SkilledUp, config, localStorageService) {
      var vm = this,
        parsers = {
          priceRanges: $parse('model.facets.price.ranges || []'),
          productTypes: $parse('model.facets[\'product.type\'].terms || []'),
          productTypesCount: $parse('model.facets[\'product.type\'].total || 0'),
          pageNumber: $parse('model.pageNumber'),

        },
        currencyFilter = $filter('currency');

      vm.priceRanges = []; // prices ranges that we are showing in our UI
      vm.productTypes = []; // product ranges that we are showing in our UI

      /**
       * Method to setup data model for price filters rather than doing logic in the view
       * @return {Object} vm.allPrices: number of products available at all prices, vm.priceRanges: object for price ranged products
       */
      vm.getFilters = function() {
        vm.productTypesCount = parsers.productTypesCount(vm); // product types count
        // console.log('filters', vm.filter.price, vm.filter.type, vm.priceRanges.length, vm.productTypes.length);

        // if filters selected, update them
        if ((vm.filter.price !== '{}' || vm.filter.type) && vm.priceRanges.length && vm.productTypes.length) {
          vm.updateFilters();
        } else {
          vm.createFilters();
        }
      };

      vm.createFilters = function() {
        vm.allPricesCount = 0; // sum of all products

        vm.priceRanges = parsers.priceRanges(vm).filter(function(range) {
          if (range.totalCount && angular.isNumber(range.from) && angular.isNumber(range.to)) {
            switch (range.from) {
              case -1:
                range.name = 'No Price Found';
                break;
              case 0:
                range.name = 'Free';
                break;
              default:
                if (range.from > 1) {
                  range.name = '' + vm.formatCurrency(Math.round(range.from / 10) * 10) + ' - ' + vm.formatCurrency(range.to);
                } else {
                  range.name = 'Less than $' + range.to;
                }
            }
            vm.allPricesCount += range.totalCount;
            // round to two digits
            range.value = angular.toJson({
              min: range.from,
              max: range.to
            });
            return true;
          } else {
            return false;
          }
        });
        // put no price range at end
        var noPriceIdx = vm.priceRanges.findIndex(function(range) {
          return range.max === -1;
        });
        if (noPriceIdx > -1) {
          Array.prototype.push.apply(vm.priceRanges, vm.priceRanges.splice(noPriceIdx, 1));
        }

        vm.productTypes = parsers.productTypes(vm);
      };

      vm.formatCurrency = function(number) {
        return currencyFilter(number, undefined, 0);
      };

      vm.updateFilters = function() {
        var match;

        // if no price filter, update counts
        // if (vm.filter.price === '{}' || vm.filter.type) {

        // refresh filters
        var allPricesCount = 0;

        // initialize counts to 0
        vm.priceRanges.forEach(function(range) {
          range.totalCount = range.count = 0;
        });

        // update existing price range counts
        parsers.priceRanges(vm).forEach(function(range) {
          if (range.totalCount) {
            allPricesCount += range.totalCount;
            match = vm.priceRanges.find(function(existing) {
              return existing.from === range.from && existing.to === range.to;
            });
            if (match) {
              match.totalCount = match.count = range.totalCount;
            }
          }
        });

        vm.allPricesCount = allPricesCount; // sum of all products
        // }


        // initialize counts to 0
        vm.productTypes.forEach(function(prodType) {
          prodType.count = 0;
        });

        // update existing product type counts
        parsers.productTypes(vm).forEach(function(prodType) {
          match = vm.productTypes.find(function(existing) {
            return existing.term === prodType.term;
          });
          if (match) {
            match.count = prodType.count;
          }
        });


      };

      /**
       * Method called to update data model upon pagination or filters
       * @param  {String} skill Name of Skill to show products for
       * @param  {Number} page  Page number requested from pagination
       * @return {Object} $scope.model
       */

      vm.updateModel = function(page, typeFilter, priceFilter) {
        var $uibModalEl = angular.element('.modal'),
          priceRange;

        // scroll to top (add check for this to work with phantomjs)
        if ($uibModalEl.length) {
          $uibModalEl.scrollTo(0, 0, 350);
        }
        try {
          priceRange = angular.fromJson(priceFilter);
        } catch (e) {
          // do nothing;
        }
        priceRange = priceRange || {};
        // use 1-based page for model binding since ui-bootstrap pagination doesn't support 0-based
        vm.currentPage = page;
        // substract one for query since it's 0-based
        page = Math.max((page || 0) - 1, 0);

        // console.log('priceRange', priceRange);
        vm.courseWait = SkilledUp.getProducts({
          q: keywords,
          'page.size': config.pageSize,
          'page.number': page,
          facet: config.facets,
          'product.type.name': typeFilter || undefined,
          'price.min': priceRange.min,
          'price.max': priceRange.max
        }).then(function(results) {
          vm.model = results.data;

          vm.getFilters();
          vm.saveFilterValues(typeFilter, priceFilter);
        });
        return vm.courseWait;
      };

      vm.saveFilterValues = function(typeFilter, priceFilter) {
        // save filter values
        var savedFilters = localStorageService.get(config.filtersCookieKey) || {};
        savedFilters[vm.keywords] = {
          type: typeFilter,
          price: priceFilter
        };
        localStorageService.set(config.filtersCookieKey, savedFilters);
      };

      vm.activate = function() {
        // initialize controller by setting up model, current page and filter values
        vm.model = products;
        vm.keywords = keywords;
        // console.log(products);
        vm.currentPage = parsers.pageNumber(vm);

        var savedFilter = (localStorageService.get(config.filtersCookieKey) || {})[vm.keywords] || {};
        vm.filter = {
          type: savedFilter.type || '', // default to all course types
          price: savedFilter.price || config.defaultPriceFilter, // default to free
        };
        vm.filter.collapsed =  vm.filter.type || vm.filter.price !== config.defaultPriceFilter ? false : true;// default to collapse filters

        vm.getFilters();
      };

      vm.activate();
    }
  ])

  .directive('apCareerSkillsModalLink', [
    function() {
      return {
        restrict: 'E',
        scope: {
          skill: '=',
          addClasses: '@',
          hideIcon: '@',
          linkText: '@'
        },
        templateUrl: 'app/components/careerSkills/careerSkillsModalLink.html',
        controller: 'CareerSkillsController as careerSkills',
      };
    }
  ])

  .filter('keywordFilter',
    function() {
      return function(str) {
        return str.replace('+', ' ');
      };
    }
  )

  .filter('removeProtocol', function() {
    return function(str) {
      var n = str.indexOf('//');
      return n > -1 ? str.substring(n) : str;
    };
  });

})();
