'use strict';

(function(angular) {
  angular.module('apollo-coach-marks', [])
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('coach-mark.html',
        '<div class="popover coach-mark"><div class="arrow"></div> <div class="popover-inner"><h3 class="popover-title">{{heading}}</h3> <div class="popover-content container-fluid"> <div class="row"> <div class="col-md-12 popover-text" id="popover-text">{{text}}</div> </div> <div class="row"> <div class="col-md-7 skip-class text-left"> <label class="hide-intro"> <input id="skipBtn" tabindex="0" type="checkbox" class="skipBtn btn-xs"/> Don\'t show this tip again</label> </div> <div class="col-md-5 text-right buttons"> <button id="nextBtn" class="nextBtn btn-xs" type="button" tabindex="0">CLOSE</button> <a id="prevBtn" class="prevBtn btn-xs" href="" tabindex="0">Back</a> </div> </div> </div> </div></div>'
      );
      $templateCache.put('tips-slider.html',
        '<div class="tips-viewport"><div class="tips-wrapper zero"></div><div class="tips-control"><ul class="tips-control-list"></ul><div class="tip-menu"><a class="font-tiny previous-slide">Back</a><span class="font-tiny">&nbsp;|&nbsp;  </span> <a class="font-tiny next-slide">Next</a> </div> </div> </div>'
      );
    }])
    .factory('coachMarkFactory', ['$templateCache', '$window', '$timeout',
      function($templateCache, $window, $timeout) {
        var CoachMark = function() {};
        CoachMark.prototype = {
          template: 'coach-mark.html',
          scope: null,
          id: null,
          steps: null,
          currentStepCount: null,
          showCurtain: null,
          curtainClass: null,
          curtainHanger: null,
          recallLimit: 5,
          called: 0,
          init: function(scope) {
            this.scope = scope;
            this.steps = scope.config.steps;
            this.currentStepCount = 0;
            this.showCurtain = angular.isDefined(scope.config.showCurtain) ? scope.config.showCurtain : true;
            this.curtainClass = scope.config.curtainClass;
            this.curtainHanger = scope.config.curtainHanger || 'body';
            this.id = scope.config.id || 'cm-';
            this.skiptext = scope.skipText || 'SKIP';
          },
          curtain: function(hide) {
            var curtain = angular.element(this.curtainHanger).find('#ng-curtain');
            if (hide) {
              if (curtain.length > 0) {
                curtain.fadeOut(100, function() {
                  curtain.remove();
                });
              }
            } else {
              if (curtain.length === 0) {
                var pre = angular.element('<div id=\"ng-curtain\"></div>');
                if (this.curtainClass) {
                  pre.addClass(this.curtainClass);
                }
                angular.element(this.curtainHanger).append(pre);
                curtain = angular.element(this.curtainHanger).find('#ng-curtain');
                curtain.fadeIn(750);
              }
              curtain.animate({
                opacity: 0.5
              }, 400, '');
            }
          },
          nextMark: function() {
            var currentStep = this.steps[this.currentStepCount],
              self = this,
              mark = document.querySelector('.coach-mark'); // jshint ignore:line
            if (mark) {
              this.destroy();
            }
            $timeout(function() {
              switch (currentStep.type) {
                case 'title':
                  self.titleStep();
                  break;
                case 'element':
                  if (self.domReady()) {
                    self.elementStep();
                    self.called = 0;
                  } else {
                    if (self.called < self.recallLimit) {
                      $timeout(function() {
                        self.called++;
                        self.nextMark();
                      });
                    }
                  }
                  break;
              }
            }, currentStep.delay || 0);
          },
          showMark: function() {
            var currentStep = this.steps[this.currentStepCount],
              mark = angular.element('#' + this.id + this.currentStepCount);

            if (this.showCurtain) {
              this.curtain();
            }
            if (currentStep.slides) {
              this.sliderEvents();
            }
            this.nextButton();
            this.prevButton();
            this.skipButton();
            mark.fadeIn(250);
            if (currentStep.scroll) {
              this.scrollToElement();
            }
          },
          scrollToElement: function() {
            var currentStep = this.steps[this.currentStepCount],
              mark = angular.element('#' + this.id + this.currentStepCount),
              offTop = mark.offset().top,
              elHeight = mark.height(),
              winHeight = $window.innerHeight,
              scroll,
              container;

            if (currentStep.type === 'element') {
              scroll = offTop - (elHeight + 60);
            } else {
              if (elHeight < winHeight) {
                scroll = offTop - ((winHeight / 2) - (elHeight / 2));
              } else {
                scroll = offTop;
              }
            }
            // account for modal containers
            container = angular.element('.modal-open .modal');
            if (!container.length) {
              container = angular.element('html, body');
            }
            container.animate({
              scrollTop: scroll
            }, 1000);

          },
          titleStep: function() {
            var currentStep = this.steps[this.currentStepCount],
              hanger = angular.element('<div id=\"coach-mark-title\" class=\"coach-mark-title\"></div>'),
              mark = angular.element($templateCache.get(this.template));
            // using compile was waiting for scope promises to be resolved before binding scope variables to the template
            // doing this the jQuery way we get faster marks
            if (currentStep.heading) {
              mark.find('.popover-title').html(currentStep.heading);
            } else {
              mark.find('.popover-title').hide();
            }
            if (currentStep.slides) {
              mark.find('.popover-text').html(this.addSliderText());
            } else {
              mark.find('.popover-text').html(currentStep.text);
            }
            mark.attr('id', this.id + this.currentStepCount);
            mark.find('.arrow').hide();
            mark.removeClass('popover');
            hanger.append(mark);
            angular.element('body').append(hanger);
            this.showMark();
            if (angular.isFunction(currentStep.onActivate)) {
              currentStep.onActivate();
            }
          },
          domReady: function() {
            var currentStep = this.steps[this.currentStepCount],
              target;

            if (currentStep.selector) {
              target = angular.element(currentStep.selector);
            }
            if (currentStep.selectorToAttach) {
              target = angular.element(currentStep.selectorToAttach);
            }

            if (target.length > 0) {
              return true;
            } else {
              return false;
            }

          },
          elementStep: function() {
            var currentStep = this.steps[this.currentStepCount],
              mark = angular.element($templateCache.get(this.template)),
              hanger,
              hostTop,
              hostLeft,
              hostElWidth,
              hostElHeight,
              markWidth,
              markHeight,
              markPos;

            // add html content
            if (currentStep.heading) {
              mark.find('.popover-title').html(currentStep.heading);
            } else {
              mark.find('.popover-title').hide();
            }
            mark.find('.skipLabel').text(this.skiptext);
            if (currentStep.slides) {
              mark.find('.popover-text').html(this.addSliderText());
            } else {
              mark.find('.popover-text').html(currentStep.text);
            }
            mark.attr('id', this.id + this.currentStepCount);

            if (this.currentStepCount === 0) {
              mark.find('#prevBtn').hide();
            }

            // highlight selected element
            this.highlight();

            // add mark to element
            if (currentStep.selectorToAttach) {
              hanger = angular.element(currentStep.selectorToAttach);
            } else {
              hanger = angular.element(currentStep.selector);
            }
            mark.css({
              'display': 'block',
              'visibility': 'hidden'
            });
            hanger.append(mark);

            // setup positioning
            hostTop = hanger.prop('offsetTop');
            hostLeft = hanger.prop('offsetLeft');
            hostElWidth = hanger.prop('offsetWidth');
            hostElHeight = hanger.prop('offsetHeight');
            markWidth = mark.prop('offsetWidth');
            markHeight = mark.prop('offsetHeight');

            switch (currentStep.placement) {
              case 'top':
                markPos = {
                  top: '-' + (markHeight + 12) + 'px',
                  left: (hostElWidth / 2 - markWidth / 2) + 'px'
                };
                mark.addClass('top');
                break;
              case 'left':
                markPos = {
                  top: (hostElHeight / 2 - markHeight / 2) + 'px',
                  left: '-' + (markWidth + 12) + 'px'
                };
                mark.addClass('left');
                break;
              case 'bottom':
                markPos = {
                  top: (hostElHeight + 12) + 'px',
                  left: (hostElWidth / 2 - markWidth / 2) + 'px'
                };
                mark.addClass('bottom');
                break;

              case 'center':
                markPos = {
                  top: '-' + (markHeight / 2 + 50) + 'px',
                  left: (markWidth / 2) + 'px'
                };
                mark.addClass('center');
                break;

              case 'skbCM':
                markPos = {
                  top: '-10%',
                  left: '-2%'
                };
                mark.addClass('center');
                break;

              default:
                markPos = {
                  top: (hostElHeight / 2 - markHeight / 2) + 'px',
                  left: (hostElWidth + 12) + 'px'
                };
                mark.addClass('right');
                break;
            }

            // check for offsets
            if (currentStep.offset) {
              this.addOffsets(markPos);
            }

            // check for arrow positions
            if (currentStep.arrowPosition) {
              this.positionArrow(mark);
            }

            // set css
            mark.css({
              'top': markPos.top,
              'left': markPos.left,
              'display': 'none',
              'visibility': 'visible'
            });

            this.showMark();
            if (angular.isFunction(currentStep.onActivate)) {
              currentStep.onActivate();
            }

          },
          addSliderText: function() {
            var currentStep, slider, list, items, controls;

            currentStep = this.steps[this.currentStepCount];
            slider = angular.element($templateCache.get('tips-slider.html'));
            list = slider.find('.tips-wrapper');
            items = currentStep.slides.text.map(function(txt) {
              return '<div class="items">' + txt + '</div>';
            }).join('');
            list.append(items);
            controls = currentStep.slides.text.map(function(ctrl, idx) {
              if (idx === 0) {
                return '<li class="tip-selector active" data-slide="' + idx + '"></li>';
              } else {
                return '<li class="tip-selector" data-slide="' + idx + '"></li>';
              }
            }).join('');
            slider.find('.tips-control-list').append(controls);

            return slider;
          },
          addOffsets: function(markPos) {
            var currentStep = this.steps[this.currentStepCount];
            if (currentStep.offset.top) {
              if (typeof currentStep.offset.top === 'string') {
                markPos.top = currentStep.offset.top;
              } else {
                markPos.top = parseInt(markPos.top.slice(0, markPos.top.length - 2)) + currentStep.offset.top + 'px';
              }
            }

            if (currentStep.offset.left) {
              if (typeof currentStep.offset.left === 'string') {
                markPos.left = currentStep.offset.left;
              } else {
                markPos.left = parseInt(markPos.left.slice(0, markPos.left.length - 2)) + currentStep.offset.left + 'px';
              }
            }
            return markPos;
          },
          positionArrow: function(mark) {
            var currentStep = this.steps[this.currentStepCount];

            switch (currentStep.arrowPosition) {
              // AA: Not sure why this is here.
              // case 'top':
              //   mark.find('.arrow').css('top', '10%');
              //   break;
              // case 'left':
              //   mark.find('.arrow').css('left', '10%');
              //   break;
              // case 'bottom':
              //   mark.find('.arrow').css('bottom', '-5.8%');
              //   break;
              // case 'right':
              //   mark.find('.arrow').css('right', '10%');
              //   break;
              case 'none':
                mark.find('.arrow').hide();
                break;
              default:
                // pass an array of desired values for exact positioning of arrow
                mark.find('.arrow').css(currentStep.arrowPosition[0], currentStep.arrowPosition[1]);
            }

            return mark;
          },
          highlight: function() {
            var currentStep = this.steps[this.currentStepCount],
              self = this,
              elemToHighlight;
            if (currentStep.selectorToHighlight) {
              elemToHighlight = angular.element(currentStep.selectorToHighlight);
            } else {
              elemToHighlight = angular.element(currentStep.selector);
            }
            if (elemToHighlight.length > 0) {
              if (elemToHighlight.css('position') === 'static') {
                elemToHighlight.addClass('coach-mark-element-static');
              } else {
                elemToHighlight.addClass('coach-mark-element-non-static');
              }
            } else {
              $timeout(function() {
                if (self.called < self.recallLimit) {
                  self.highlight();
                }
              });
            }
          },
          unhighlight: function(step) {
            var elemToUnhighlight;
            angular.element('#' + this.id + step).hide();
            if (this.steps[step].selectorToHighlight) {
              elemToUnhighlight = angular.element(this.steps[step].selectorToHighlight);
            } else {
              elemToUnhighlight = angular.element(this.steps[step].selector);
            }

            if (elemToUnhighlight.hasClass('coach-mark-element-static')) {
              elemToUnhighlight.removeClass('coach-mark-element-static');
            }

            if (elemToUnhighlight.hasClass('coach-mark-element-non-static')) {
              elemToUnhighlight.removeClass('coach-mark-element-non-static');
            }
          },
          sliderEvents: function() {
            // WARNING SLIDER IS HARD CODED TO THREE ITEMS, this was a fast one off implementation added after coach marks were built, will need to be refactored to be dynamic number of slides
            var self, selector, active, prev, next, to;
            self = this;
            selector = angular.element('.tip-selector');
            selector.click(function() {
              active = angular.element(this).data('slide');
              self.sliderSelector(active);
              self.slide(active);
            });
            prev = angular.element('.previous-slide');
            prev.click(function() {
              to = self.prevSlide();
              self.sliderSelector(to);
              self.slide(to);
            }.bind(this));
            next = angular.element('.next-slide');
            next.click(function() {
              to = self.nextSlide();
              self.sliderSelector(to);
              self.slide(to);
            });
          },
          sliderSelector: function(active) {
            var mark, item;
            mark = angular.element('#' + this.id + this.currentStepCount);
            item = mark.find('.tip-selector')[active];
            mark.find('.active').removeClass('active');
            mark.find(item).addClass('active');
          },
          slide: function(active) {
            var tips;
            tips = angular.element('.tips-wrapper');
            switch (active) {
              case 0:
                tips.removeClass('one two').addClass('zero');
                break;
              case 1:
                tips.removeClass('zero two').addClass('one');
                break;
              case 2:
                tips.removeClass('zero one').addClass('two');
                break;
            }
          },
          nextSlide: function() {
            var currentStep, active, to;
            currentStep = this.steps[this.currentStepCount];
            active = angular.element('.tip-selector.active').data('slide');
            to = active === (currentStep.slides.text.length - 1) ? 0 : (active + 1);
            return to;
          },
          prevSlide: function() {
            var currentStep, active, to;
            currentStep = this.steps[this.currentStepCount];
            active = angular.element('.tip-selector.active').data('slide');
            to = active !== 0 ? (active - 1) : (currentStep.slides.text.length - 1);
            // to = active !== 0 ? (active - 1) : 2;
            return to;
          },
          // functionStep: function (){},
          // locationStep: function (){},
          skipButton: function() {
            var self = this;

            angular.element('.skipBtn').one('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              self.skip();
            });
          },
          nextButton: function() {
            var btn = angular.element('.coach-mark').find('.nextBtn'),
              self = this;
            if (this.hasReachedEnd()) {
              btn.text('Close');
            } else {
              btn.text('Okay');
            }
            btn.one('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              self.goToNext();
            });
          },
          goToNext: function() {
            if (!this.hasReachedEnd()) {
              this.cleanup(this.currentStepCount);
              this.currentStepCount++;
              this.nextMark();
            } else {
              this.destroy();
            }
          },
          prevButton: function() {
            var btn = angular.element('.coach-mark').find('.prevBtn'),
              self = this;
            if (this.currentStepCount === 0) {
              btn.attr('disabled', 'disabled');
            } else {
              if (btn.attr('disabled')) {
                btn.removeAttr('disabled');
              }
              btn.one('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                self.goToPrevious();
              });
            }
          },
          goToPrevious: function() {
            this.cleanup(this.currentStepCount);
            var prev = this.steps[this.currentStepCount];
            if (prev.type === 'title' || prev.type === 'element') {
              this.currentStepCount--;
              this.nextMark();
            }
          },
          skip: function() {
            this.destroy();
            if (this.scope.onSkip) {
              this.scope.onSkip();
            }
          },
          hasReachedEnd: function() {
            if (this.steps && this.steps.length) {
              return this.currentStepCount === (this.steps.length - 1);
            } else {
              return true;
            }
          },
          cleanup: function(step) {
            var mark = angular.element('#' + this.id + step);
            if (this.steps[step].type === 'element') {
              this.unhighlight(step);
            }
            mark.fadeOut(100, function() {
              mark.remove();
            });
          },
          destroy: function() {
            var self = this;
            angular.element('.coach-mark').remove();
            this.scope.config.start = false;
            $timeout(function() {
              self.scope.$apply();
            });
            this.curtain(true);
            if (this.scope.onFinish) {
              this.scope.onFinish();
            }
            angular.forEach(this.steps, function(step, index) {
              if (step.type === 'element') {
                self.unhighlight(index);
              }
            });
          }
        };
        return {
          getInstance: function(scope) {
            if (scope) {
              var cm = new CoachMark();
              cm.init(scope);
              return cm;
            } else {
              // log error
              return;
            }
          }
        };
      }
    ])
    .directive('coachMark', [
      'coachMarkFactory',
      function(coachMarkFactory) {
        return {
          restrict: 'AE',
          priority: 9,
          scope: {
            'config': '=',
            'onFinish': '&',
            'onSkip': '&',
            'skipText': '@'
          },
          link: function(scope) {
            var marks;

            // trigger new start value for coachMarks
            scope.$watch('config.start', function(newval) {
              if (newval) {
                marks = coachMarkFactory.getInstance(scope);
                // marks.destroy();
                marks.nextMark();
              }
            });



            // listen for a location change to exit tour
            scope.$on('$stateChangeStart', function() {
              angular.element('#ng-curtain').remove();
              angular.element('.coach-mark').remove();
            });

            // listen for a functional exit event from controller
            scope.$on('exit-coach-marks', function() {
              if (marks) {
                marks.destroy();
              }
            });
          }
        };
      }
    ]);

})(angular);
