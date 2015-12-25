'use strict';
/* global jQuery */

describe('Coach Marks', function() {
  var scope, $compile, factory, template, apply, $timeout;
  jQuery.fx.off = true;

  beforeEach(function() {
    module('apollo-coach-marks');
  });

  beforeEach(inject(function(_$rootScope_, _$compile_, _coachMarkFactory_, _$templateCache_, _$timeout_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $timeout = _$timeout_;
    factory = _coachMarkFactory_;
    template = _$templateCache_.get('coach-mark.html');
    apply = function() {
      return;
    };
  }));

  describe('Factory: coachMarkFactory', function() {
    it('getInstance: should punt if no scope is passed in', function() {
      var cmf = factory.getInstance();
      expect(cmf).not.toBeDefined();
    });

    it('getInstance: should return a new instance of CoachMark', function() {
      var scope1 = {
        config: {
          start: true,
          steps: [{}]
        }
      };
      var cmf1 = factory.getInstance(scope1);
      var scope2 = {
        config: {
          start: true,
          steps: [{}, {}]
        }
      };
      var cmf2 = factory.getInstance(scope2);
      expect(cmf1.steps.length).toBe(1);
      expect(cmf2.steps.length).toBe(2);
    });

    it('init: should initialize coachmark params from config', function() {
      var scope = {
        config: {
          start: true,
          steps: [{}, {}, {}],
          curtainClass: 'test'
        }
      };
      var cmf = factory.getInstance(scope);
      expect(cmf.scope).toBeDefined();
      expect(cmf.id).toBeDefined();
      expect(cmf.steps.length).toBeTruthy();
      expect(cmf.steps.length).toEqual(3);
      expect(cmf.currentStepCount).toEqual(0);
      expect(cmf.showCurtain).toBeTruthy();
      expect(cmf.curtainClass).toBe('test');
    });

    it('curtain: should add an overlay (curtain) to the page', function() {
      var scope = {
        config: {
          start: true,
          steps: []
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.curtain();
      var curtain = angular.element('body').find('#ng-curtain');
      expect(curtain.length).toBe(1);
      curtain.remove();
    });

    it('curtain: should not add an overlay (curtain) to the page if there is already a curtain present', function() {
      var scope = {
        config: {
          start: true,
          steps: []
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.curtain();
      cmf.curtain();
      var curtain = angular.element('body').find('#ng-curtain');
      expect(curtain.length).toBe(1);
      curtain.remove();
    });

    it('curtain: should remove the overlay (curtain) from the page', function() {
      var scope = {
        config: {
          start: true,
          steps: []
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.curtain();
      var curtain1 = angular.element('body').find('#ng-curtain');
      expect(curtain1.length).toBe(1);

      cmf.curtain(true);
      var curtain2 = angular.element('body').find('#ng-curtain');
      expect(curtain2.length).toBe(0);
      curtain1.remove();
      curtain2.remove();
    });

    it('curtain: should add a class to curtain', function() {
      var scope = {
        config: {
          start: true,
          steps: [{}, {}, {}],
          curtainClass: 'test-class'
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.curtain();
      var curtain = angular.element('#ng-curtain');
      expect(curtain.hasClass('test-class')).toBeTruthy();
      curtain.remove();
    });

    it('curtain: should add multiple classes to curtain', function() {
      var scope = {
        config: {
          start: true,
          steps: [{}, {}, {}],
          curtainClass: 'test-class another-class'
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.curtain();
      var curtain = angular.element('#ng-curtain');
      expect(curtain.hasClass('test-class')).toBeTruthy();
      expect(curtain.hasClass('another-class')).toBeTruthy();
      curtain.remove();
    });

    it('nextMark: should call titleStep function', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'title',
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'titleStep');
      cmf.nextMark();
      $timeout.flush();
      expect(cmf.titleStep).toHaveBeenCalled();

      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('showMark: should call nextButton, prevButton', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'title',
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'nextButton');
      spyOn(cmf, 'prevButton');
      cmf.showMark();
      expect(cmf.nextButton).toHaveBeenCalled();
      expect(cmf.prevButton).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('scrollToElement: should scroll to coach mark', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'title',
            text: 'test',
            scroll: true
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      cmf.nextMark();
      expect(angular.element('body').scrollTop()).toBe(0);
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('titleStep: should add coach-mark-title to page body with heading and title', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      angular.element('body').append(template);
      var cmf = factory.getInstance(scope);
      cmf.titleStep();
      var cm = angular.element('#' + cmf.id + cmf.currentStepCount);
      expect(cm).toBeDefined();
      expect(cm.find('.popover-text').html()).toBe('This is test text.');
      expect(cm.find('.popover-title').html()).toBe('HEADING');
      expect(cm.find('.arrow').css('display')).toBe('none');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('elementStep: should attach a coach-mark to selector with a heading and title and arrow position top', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            selector: '#test',
            heading: 'elementStep',
            text: 'This is test text for the elementStep.',
            placement: 'top'
          }]
        }
      };
      angular.element('body').append('<div id="test"></div>');
      var cmf = factory.getInstance(scope);
      var cm = angular.element('#test');
      cmf.elementStep();
      expect(cm.find('.coach-mark').length).toBe(1);
      expect(angular.element('#cm-0').hasClass('top')).toBeTruthy();
      expect(cm.find('.popover-title').html()).toBe('elementStep');
      expect(cm.find('.popover-text').html()).toBe('This is test text for the elementStep.');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('elementStep: should call to highlight selector, addOffsets and positionArrow', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            selector: '#test',
            heading: 'elementStep',
            text: 'This is test text for the elementStep.',
            placement: 'top',
            offset: {
              top: 10,
              left: -10
            },
            arrowPosition: 'left'
          }]
        }
      };
      angular.element('body').append('<div id="test"></div>');
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'highlight');
      spyOn(cmf, 'addOffsets');
      spyOn(cmf, 'positionArrow');
      cmf.elementStep();
      expect(cmf.highlight).toHaveBeenCalled();
      expect(cmf.addOffsets).toHaveBeenCalled();
      expect(cmf.positionArrow).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('addOffsets: should add offset values to markPos', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            heading: 'HEADING',
            text: 'This is test text.',
            offset: {
              top: 100,
              left: 100
            }
          }]
        }
      };
      var markPos = {
        top: '-100px',
        left: '-100px'
      };
      var cmf = factory.getInstance(scope);
      cmf.addOffsets(markPos);
      expect(markPos.top).toBe('0px');
      expect(markPos.left).toBe('0px');
    });

    xit('positionArrow: should style attr to arrow for left position', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            selector: '#test',
            heading: 'elementStep',
            text: 'This is test text for the elementStep.',
            placement: 'top',
            arrowPosition: 'left'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      var mark = angular.element(template);
      cmf.positionArrow(mark);
      expect(mark.find('.arrow[style*="left"]').length).toBe(1);
    });

    it('highlight: should add non-static class to child selector', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            selector: '#parent',
            selectorToHighlight: '#child',
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      angular.element('body').append('<div id="parent"><div id="child" style="position:relative"></div></div>');
      cmf.highlight(0);
      expect(angular.element('#child').hasClass('coach-mark-element-non-static')).toBeTruthy();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('unhighlight: should remove non-static class from child selector', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            selector: '#parent',
            selectorToHighlight: '#child',
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      angular.element('body').append('<div id="parent"><div id="child" style="position:relative"></div></div>');
      cmf.highlight();
      expect(angular.element('#child').hasClass('coach-mark-element-non-static')).toBeTruthy();
      cmf.unhighlight(0);
      expect(angular.element('#child').hasClass('coach-mark-element-non-static')).toBeFalsy();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('nextButton: text should be set to CLOSE when there are no more steps', function() {
      var scope = {
        config: {
          start: false,
          steps: []
        }
      };
      angular.element('body').append('<div class="coach-mark"><button id="nextBtn" class="nextBtn btn-xs text-right" type="button">Close</button></div>');
      var cmf = factory.getInstance(scope),
        btn = angular.element('.coach-mark').find('.nextBtn');
      cmf.nextButton();
      expect(btn.text()).toBe('Close');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('nextButton: text should be set to OKAY when there are more steps', function() {
      var scope = {
        config: {
          start: false,
          steps: [{}, {}]
        }
      };
      angular.element('body').append('<div class="coach-mark"><button id="nextBtn" class="nextBtn btn-xs text-right" type="button">Close</button></div>');
      var cmf = factory.getInstance(scope),
        btn = angular.element('.coach-mark').find('.nextBtn');
      cmf.nextButton();
      expect(btn.text()).toBe('Okay');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('goToNext: cleanup should get called', function() {
      scope = {
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }, {
            type: 'title',
            heading: 'CAREER INTERESTS TWO',
            text: 'this is a test and doesn\'t mean anything.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);

      spyOn(cmf, 'cleanup');
      cmf.goToNext();
      expect(cmf.cleanup).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('goToNext: nextMark should get called and currentStepCount should get incremented', function() {
      scope = {
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }, {
            type: 'title',
            heading: 'CAREER INTERESTS TWO',
            text: 'this is a test and doesn\'t mean anything.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'nextMark');
      cmf.goToNext();
      expect(cmf.currentStepCount).toEqual(1);
      expect(cmf.nextMark).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('goToNext: destroy should get called', function() {
      scope = {
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);

      spyOn(cmf, 'destroy');
      cmf.goToNext();
      expect(cmf.destroy).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('prevButton: should be disabled if on first step', function() {
      var scope = {
        config: {
          start: false,
          steps: []
        }
      };
      angular.element('body').append('<div class="coach-mark"><a id="prevBtn" class="prevBtn btn-xs" href="" tabindex="0">Back</a></div>');
      var cmf = factory.getInstance(scope),
        btn = angular.element('.coach-mark').find('.prevBtn');
      cmf.prevButton();
      expect(btn.attr('disabled')).toBe('disabled');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('prevButton: should not be disabled after first step', function() {
      var scope = {
        config: {
          start: false,
          steps: []
        }
      };
      angular.element('body').append('<div class="coach-mark"><a id="prevBtn" class="prevBtn btn-xs" href="" tabindex="0">Back</a></div>');
      var cmf = factory.getInstance(scope),
        btn = angular.element('.coach-mark').find('.prevBtn');
      cmf.currentStepCount = 1;
      cmf.prevButton();
      expect(btn.attr('disabled')).not.toBeDefined();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('goToPrevious: cleanup should be called', function() {
      scope = {
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }, {
            type: 'title',
            heading: 'CAREER INTERESTS TWO',
            text: 'this is a test and doesn\'t mean anything.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'cleanup');
      cmf.nextMark();
      cmf.goToNext();
      cmf.goToPrevious();
      expect(cmf.cleanup).toHaveBeenCalled();
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('skip: should call destroy and controller skip function', function() {
      scope = {
        onSkip: function() {},
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'destroy');
      spyOn(scope, 'onSkip');
      cmf.skip();
      expect(cmf.destroy).toHaveBeenCalled();
      expect(scope.onSkip).toHaveBeenCalled();
    });

    it('hasReachedEnd: should return true if there are no remaining steps', function() {
      var scope = {
        config: {
          start: false,
          steps: []
        }
      };
      var cmf = factory.getInstance(scope);
      expect(cmf.hasReachedEnd()).toBeTruthy();
    });

    it('cleanup: should hide element of step passed to it', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      angular.element('body').append(template);
      var cmf = factory.getInstance(scope);
      cmf.titleStep();
      var cm = angular.element('#' + cmf.id + cmf.currentStepCount);
      expect(cm).toBeDefined();
      cmf.cleanup(0);
      expect(cm.css('display')).toBe('none');
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('cleanup: should call unhighlight if step type is element', function() {
      var scope = {
        config: {
          start: true,
          steps: [{
            type: 'element',
            heading: 'HEADING',
            text: 'This is test text.'
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'unhighlight');
      cmf.cleanup(0);
      expect(cmf.unhighlight).toHaveBeenCalledWith(0);
      cmf.scope.$apply = apply;
      cmf.destroy();
    });

    it('destroy: should remove all coach-marks from DOM and call curtian with true', function() {
      scope = {
        config: {
          start: false,
          steps: [{
            type: 'title',
            heading: 'CAREER INTERESTS',
            text: 'The start of any good career plan begins with having a clear goal in mind.',
          }]
        }
      };
      var cmf = factory.getInstance(scope);
      spyOn(cmf, 'curtain');
      cmf.nextMark();
      $timeout.flush();
      expect(angular.element('.coach-mark').length).toBe(1);
      cmf.scope.$apply = apply;
      cmf.destroy();
      expect(angular.element('.coach-mark').length).toBe(0);
      expect(cmf.curtain).toHaveBeenCalledWith(true);
    });

    it('directive should watch for config start changes', function() {
      scope.conf = {
        start: false,
        steps: [{
          type: 'title',
          heading: 'CAREER INTERESTS',
          text: 'The start of any good career plan begins with having a clear goal in mind.',
        }]
      };
      $compile('<coach-mark config="conf"></coach-mark>')(scope);
      scope.$digest();
      expect(angular.element('#cm-0').length).toBe(0);
      scope.conf.start = true;
      scope.$digest();
      $timeout.flush();
      expect(angular.element('#cm-0').length).toBe(1);
    });

  });

});
