/**
 * Created by yrganta on 5/18/15.
 */
'use strict';

angular.module('apollo-modal-sample-button', [
  'ui.bootstrap'
])

  .directive('apModalSampleButton', ['$uibModal',
    function () {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          buttonText: '@',
          modalPath: '@',
          modalSize: '@'  // defaults to lg
        },
        template: '<div class="col button-col"><a role="button" href class="cta sample" ng-click="viewSample();">{{buttonText}}</a></div>',
        controller: ['$scope', '$uibModal',
          function ($scope, $modal) {

            $scope.viewSample = function () {
              $modal.open({
                templateUrl: $scope.modalPath,
                size: $scope.modalSize || 'lg'
                /* backdrop: false */
              });
            };
          }
        ]
      };
    }
  ]);

/**
 * Created by sshroff on 10/23/15.
 */
'use strict';
angular.module('apolloAngularResumeBuilder.InfoTipsContent', [])
  .constant('INFOTIPSCONTENT', {
  'contact':{
    'email':'<p><strong>Email</strong></p>'+
            '<p><strong>Tip:</strong>&nbsp;Make sure you&nbsp;use a professional-looking email address with your name like <a href="mailto:John.Smith@email.com">John.Smith@email.com</a>. Addresses such as <a href="mailto:Surfer82@email.com">Surfer82@email.com</a> or <a href="mailto:horselover3@email.com ">horselover3@email.com</a> are not considered professional.&nbsp;Make sure to check the inbox of the email address you list on a daily basis.</p>',

    'websites':'<p><strong>Websites</strong></p>'+
               '<p><strong><strong>Tip:</strong></strong>&nbsp;Include any personal websites or online portfolios you have that are relevant to the job for which you are applying. You should <em>not</em> include a link to a personal Facebook page.&nbsp;Adding your LinkedIn address would be appropriate; however, make sure to create a short URL that looks similar to this: http://www.linkedin.com/in/myname</p>'
  },
  'summary':{
    'section' :'<p><strong>Summary of Qualifications</strong></p>'+
               '<p><strong>Tip:</strong>&nbsp;This section is your chance to quickly tell the hiring manager why YOU are the right person for the job. We recommend working on this section last after you have added all of your information to your resume. The section should be 3-4 bullet points that best summarize your experience and qualifications. Focus on your achievements, recognitions and results that are relevant to the job description.</p>'+
               '<p><strong>Example:</strong>&nbsp;Here is an example of a great summary for an individual applying for a managerial sales position.</p>'+
               '<ul>'+
                '<li>5+ years of business experience including management responsibility of a four-person sales team.</li>'+
                '<li>Sold $400,000 in advertising space to large companies such as Google, AT&amp;T, and Best Buy.</li>'+
                '<li>Received &quot;Sales Leadership&quot; award for sharing best practices with the entire sales team.</li>'+
               '<li>Established mentorship program for new hires in the sales department.</li>'+
               '</ul>'
  },
  'experience':{
    'section':'<p><strong>Professional Experience</strong></p>'+
                '<p><strong>Tip:</strong>&nbsp;Don&#39;t have a lot of work experience? Here are two helpful hints:</p>'+
                '<ul>'+
                  '<li>Move your Education section above Professional Experience to emphasize your education.</li>'+
                  '<li>Expand on the work experience you do have, by adding relevant internships, part time work or volunteer work.</li>'+
               '</ul>'+
                '<p><strong>Tip:</strong>&nbsp;Have a lot of work experience? Try to make your resume concise and, if possible, fit within one page. Leave out older jobs and cut down on irrelevant information. &nbsp;A concise resume with highly relevant experience is better than a long resume with semi-relevant experience.&nbsp;</p>'+
                '<p><strong>Tip:</strong> Some human resources software systems select candidates by automated keyword searches.&nbsp; Look at the job description for your target role and identify any keywords that might be relevant. If those keywords apply to you, use those words throughout your resume.</p>',

    'jobtitle':'<p><strong>Job Title</strong></p>'+
               '<p><strong>Tip:</strong> Some employers use unique titles for common jobs. Try to use common industry titles so that a hiring manager can quickly identify your position.</p>'+
               '<p><strong>Example:</strong> Use Sales Executive instead of Sales Ninja. If you do adjust your job title, make sure that it is truthful and that it does not inflate your experience level.</p>',
    'achievements':'<p><strong>Achievement Bullets</strong></p>'+
                    '<p><strong>Tip:</strong>&nbsp;Review the job description of the position you want to apply. Make sure that the achievements you include here relate to what the employer is seeking. Your most relevant achievements should appear first.</p>'+
                    '<p><strong>Tip:</strong> Each achievement bullet should have two parts.</p>'+
                    '<ul>'+
                      '<li>What did you accomplish? (Start with an action verb, such as &quot;Managed&quot; or &quot;Increased&quot;)</li>'+
                      '<li>How did it impact the organization? (Quantify results when possible)</li>'+
                    '</ul>'+
                    '<p><strong>Example:</strong>&nbsp; Here&#39;s a great example of four achievement bullets for a past retail store management job.&nbsp;</p>'+
                    '<ul>'+
                      '<li>Implemented employee incentive program that reduced employee turnover by 25%.</li>'+
                      '<li>Increased customer satisfaction score by 30 points (out of 100) in one year through a series of training initiatives that focused on improving response time of staff.</li>'+
                      '<li>Oversaw day-to-day operations including inventory management, sales reporting and expense tracking.</li>'+
                      '<li>Improved store ranking from 25th to 3rd in the region in a two-year period.</li>'+
                    '</ul>'
  },
  'education':{
    'degreeType':'<p><strong>DegreeType</strong></p>'+
                 '<p><strong>Tip:</strong> Arts or Science are the two most common degree types. Make sure what you enter is what your diploma states.</p>'+
                 '<p><strong>Example:</strong> Bachelor of <strong>Arts</strong> in English</p>',
    'major':'<p><strong>Major/Emphasis</strong></p>'+
            '<p><strong>Tip:</strong> You can include multiple majors or emphases by separating them with commas.</p>'+
            '<p><strong>Example:</strong> Degree with a double major:&nbsp;Bachelor of Science in <strong>Communication, Journalism</strong></p>',

    'gpa':'<p><strong>Additional Info</strong></p>'+
          '<p><strong>Tip:</strong> We recommend including your GPA if it is 3.0 or above</p>',

    'details':'<p><strong>Education Details</strong></p>'+
              '<p><strong>Tip:</strong> If you are short on professional experience, consider adding a couple of your most relevant courses or projects that relate to your target position here.</p>'+
              '<p><strong>Example:</strong> Here is an example of what someone applying for a marketing job with little relevant experience might write:</p>'+
              '<p>Relevant coursework: Market Analysis, International Marketing and Product Pricing Structures</p>'
  },
  'skills':{
    'section':'<p><strong>Additional Information</strong></p>'+
              '<p><strong>Tip:</strong>&nbsp;Don&#39;t have a lot of experience?</p>'+
              '<ul>'+
                '<li>We recommend including up to four types of additional information in this section. Things like skills, volunteer work, languages, interests and hobbies will show that you have passions outside of work and help build your candidacy. This is an easy way to strengthen your resume and to make yourself more marketable to employers.&nbsp;</li>'+
              '</ul>'+
              '<p><strong>Tip:</strong>&nbsp;Have a lot of experience?</p>'+
              '<ul>'+
                '<li>Only include what is most relevant to your target job. Separate multiple items with commas (e.g. PowerPoint, Excel, Word).</li>'+
              '</ul>',
    'certifications':'<p><strong>Certifications</strong></p>'+
                     '<p><strong>Tip:</strong>&nbsp;Include the professional certifications you have that are relevant for the job you are seeking. Are you Sun Java certified? Add that here. Are you IBM certified database administrator? Add that here. We recommend adding any certification that you may have; remember to make sure they are relevant for the job you are seeking.&nbsp;</p>'+
                     '<p><strong>Example:</strong>&nbsp;Here is a great example of a certification section for someone seeking a Database administrator position:</p>'+
                     '<ul>'+
                      '<li>Certifications: IBM certified Advanced database administrator</li>'+
                     '</ul>',
    'skills':'<p><strong>Skills</strong></p>'+
              '<p><strong>Tip:</strong>&nbsp;Include the professional skills you have that are relevant for the job you are seeking. Are you good with Microsoft Excel? Add that here. Are you a strong leader? Add that here. We recommend having 5-10 skills listed; remember to make sure they are relevant for the job you are seeking.&nbsp;</p>'+
              '<p><strong>Example:</strong>&nbsp;Here is a great example of a skills section for someone seeking an Administrative Assistant position:</p>'+
              '<ul>'+
                '<li>Skills: Word, Excel, PowerPoint, scheduling, professional communication, organization, 60+ wpm typing speed</li>'+
              '</ul>',

    'awards':'<p><strong>Awards</strong></p>'+
              '<p><strong>Example:</strong>&nbsp;Here is a an example of a professional award that a person applying for a sales job might include:</p>'+
              '<p>Enterprise Sales Person of the Year - Over $250K in annual sales (2012)</p>',

    'languages':'<p><strong>Languages</strong></p>'+
                 '<p><strong>Tip:</strong>&nbsp;Knowing a foreign language sets you apart from other candidates. You don&#39;t have to be completely fluent to include a foreign language on your resume.&nbsp;</p>'+
                  '<p><strong>Example:</strong></p>'+
                 '<ul>'+
                    '<li>Speak some Spanish? Say &quot;Basic oral proficiency in Spanish&quot;</li>'+
                    '<li>Almost fluent in French? Say &quot;Proficiency in French&quot;</li>'+
                    '<li>Completely fluent in German? Say &quot;Written and oral fluency in German&quot;</li>'+
                  '</ul>',
    'volunteerWork':'<p><strong>Volunteer Work</strong></p>'+
                    '<p><strong>Tip:</strong>&nbsp;Volunteer work is an important experience to highlight, as it demonstrates your character. (Note: If you do not have a lot of work experience, you may choose to put your volunteer work into your Professional Experience section instead.)</p>'+
                    '<p><strong>Example:</strong>&nbsp;Volunteer math tutor at Big Brothers &amp; Sisters (2008-2012).</p>',

    'personalHobbies':'<p><strong>Personal Hobbies</strong></p>'+
                      '<p><strong>Tip:</strong> Adding hobbies can help humanize your application. Avoid hobbies that could be considered controversial or could hurt your candidacy.</p>'
  },
  'custom':{
    'section':'<p><strong>Details</strong></p>'+
              '<p><strong>Tip:</strong>&nbsp;Use this custom section if the job/industry requires something extra.&nbsp;For instance, if you have special security clearance you might want to include that here.&nbsp;</p>'+
              '<p><strong>Example:</strong></p>'+
              '<ul>'+
                '<li>&quot;Active Government Security Clearance&quot;</li>'+
              '</ul>'
 }
});

angular.module('resume-info-tips', [
    'ui.bootstrap'
  , 'ngSanitize'
])
.directive('resumeInfoTips', [ '$sce',
  function ($sce){
    function link(scope) {
      scope.infoTipsPopover = {
        content: $sce.trustAsHtml(scope.content) || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        templateUrl: '/rb/templates/info-tips-popover.html'
      };
    }

    return {
      restrict: 'E',
      replace: true,
      scope: {
          content: '@',
        },
      templateUrl: '/rb/templates/info-tips.html',
      link: link
    };
  }
]);

/**
 * Created by yrganta on 6/2/15.
 */
(function (angular) {
  'use strict';

  angular.module('apollo-sample-resumes', [
    'resume-builder-tpls'
    , 'apollo-modal-sample-button'
  ])
    .directive('apSampleResumes', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          numCols: '='
        },
        templateUrl: '/rb/templates/sample-resumes.html',
        controller: ['$cacheFactory', function ($cacheFactory) {
          var samples = [
            {
              path: '/rb/samples/modern-accountant-resume.html',
              name: 'Accountant'
            }
            , {
              path: '/rb/samples/modern-executiveassistent-resume.html',
              name: 'Executive Assistant'
            }
            , {
              path: '/rb/samples/modern-financial-analyst-resume.html',
              name: 'Financial Analyst'
            }
            , {
              path: '/rb/samples/classic-itmanagement-resume.html',
              name: 'IT Manager'
            }
            , {
              path: '/rb/samples/alternate-managment-professional-resume.html',
              name: 'Management Professional'
            }
            , {
              path: '/rb/samples/classic-counseling-resume.html',
              name: 'Mental Health / Behavioral Counselor'
            }
            , {
              path: '/rb/samples/alternate-nurse-resume.html',
              name: 'Nurse'
            }
            , {
              path: '/rb/samples/classic-security-professional-resume.html',
              name: 'Security Professional'
            }
            , {
              path: '/rb/samples/alterante-teacher-resume.html',
              name: 'Teacher'
            }
          ];

          var filter = function (arr, size) {
            if (!arr) {
              return;
            }

            var arrayCache
              , cachedParts
              , arrString = JSON.stringify(arr)
              , newArr;


            arrayCache = $cacheFactory.get('rbpartition');
            if (!arrayCache) {
              arrayCache = $cacheFactory('rbpartition');
            }

            cachedParts = arrayCache.get(arrString + size);
            if (JSON.stringify(cachedParts) === arrString) {
              return cachedParts;
            }

            newArr = [];
            for (var i = 0; i < arr.length; i += size) {
              newArr.push(arr.slice(i, i + size));
            }
            arrayCache.put(arrString + size, newArr);
            return newArr;
          };


          var __ = this;
          var numCols = __.numCols || 3;

          __.samples = filter(samples, numCols);
          __.colClass = 'col-md-' + Math.floor(12/Math.ceil(samples.length/ numCols));

        }],
        controllerAs: 'srCtrl',
        bindToController: true
      };
    });
})(angular);

/**
 * Created by yrganta on 6/8/15.
 */
(function (angular) {
  'use strict';

  angular.module('apollo-preview-resume', [
    'resume-model'
    , 'apolloAngularResumeServices.config'
    , 'ngSanitize'
  ])
     .value('printHtmlWin', null)    // store the reference to print window
    .controller('ResumePreviewCtrl', [
      'resumeModel'
      , 'apolloAngularResumeServices.config'
      , '$sce'
      , function (resumeModel, resumeServiceConfig, $sce) {
        var __ = this;

        // expose resume model through controller.
        __.resume = resumeModel.resume.resumeObj.resume;
        __.templates = resumeModel.templates;
        __.preferences = resumeModel.preferences;
        __.docId = resumeModel.resume.meta.id;
        __.tenant = resumeServiceConfig.tenant;

        var setTemplate = function () {
          __.template = resumeModel.resume.preferences.resumeTemplatePreference || 'classic';
          __.templateUrl = $sce.trustAsResourceUrl('/rb/templates/' + __.template.toLowerCase() + '-preview.html');
          __.htmlPreviewUrl = '/api/resume-service/1/' + __.tenant  + '/users/' + __.profileId + '/resume/' + __.docId + '/html?template=' + __.template.toLowerCase() + '&download=true';
        };

        setTemplate();

        // Template preference
        __.updatePreference = function (tplName) {

          resumeModel.resume.preferences.resumeTemplatePreference = tplName;

          return resumeModel.setPreference(resumeModel.resume.meta.id, {'resumeTemplatePreference': tplName})
            .then(function () {
              setTemplate();
            });
        };

      }])
    .directive('apPreviewResume', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          profileId: '=pid'
          , hideEdit: '='
          , edit: '&onEdit'
          , cta: '='
        },
        templateUrl: '/rb/templates/preview-resume.html',
        controller: 'ResumePreviewCtrl',
        controllerAs: 'pvCtrl',
        bindToController: true
      };
    })
    // add and remove iframe, so that it won't impact browser history
    // TODO: will have to show loading view, when iframe is being rendered.
    .directive('previewIframe', function () {
        return function (scope, element, attrs) {
            scope.$watch(attrs.previewIframe, function (newVal) {
                var iframeElm = '<iframe title="Resume Preview" style="width:100%;height:100vh;padding:0;"  class="paper" src="'+ newVal +'"></iframe>';
                element.find('iframe').remove();
                element.append(iframeElm);
            });
        };
    })
    // logic is same as implemnted in CGS2.0
    .directive('printResume', ['$window', 'printHtmlWin', function ($window, printHtmlWin) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var resumePath = attrs.printResume;
                    if (!printHtmlWin) {
                        printHtmlWin = $window.open(resumePath);
                        printHtmlWin.document.close();
                        printHtmlWin.focus();
                        printHtmlWin.onload = function() {
                            printHtmlWin.print();
                            return;
                        };
                        printHtmlWin.onbeforeunload = function() {
                            printHtmlWin = null;
                            return;
                        };
                    } else {
                        printHtmlWin.focus();
                        printHtmlWin.print();
                    }
                });
            }
        };
    }]);
})(angular);

(function (angular) {
  /**
   * Created by yrganta on 6/3/15.
   */
  'use strict';

  angular.module('apollo-list-resumes', [
    'resume-model'
    , 'ui.bootstrap'
    , 'resume-builder-tpls'
    , 'resume-utils'
    , 'ngFileUpload'
  ]).controller('ResumeListCtrl',  [
      '$templateCache'
      , 'resumeModel'
      , '$uibModal'
      , '$q'
      , '$scope'
      , 'resume-utils'
      , '$filter'
      , '$parse'
      , function ($templateCache, resumeModel, $modal, $q, $scope, utils, $filter, $parse) {

        var __ = this;
        var maxResumeLimit = 25;  // max number of permissible resumes

        // Initialize with a noop func if one is not provided.
        __.edit = __.edit || angular.noop;
        __.preview = __.preview || angular.noop;
        __.complete = __.complete || angular.noop;
        __.selectionComplete = __.selectionComplete || angular.noop;
        __.isKnown = __.isKnown || angular.noop;
        __.fromScratch = __.fromScratch || angular.noop;
        __.fromFS = __.fromFS || angular.noop;

        $scope.model = resumeModel;
        $scope.hasMaxed = function () {
          return resumeModel.resumeList.length >= maxResumeLimit;
        };

        // Initialize model for a given profileId.
        __.init = function () {
          var resp;

          // Set the view to use while displaying.
          __.view = __.mini ? 'mini' : '';

          // if in known state, return immediately to avoid any service 403/401 errors
          resp = $q.when(__.isKnown() ? [] : resumeModel.init(__.profileId))
            .finally(function () {

              // Watch the model for changes and update the references of the object
              // to new collection.
              $scope.$watchCollection('model', function () {
                // Expose the list of resumes retrieved to DOM through controller.
                __.resumeList = resumeModel.resumeList;

                // Expose the size of resume list.
                __.size({size: resumeModel.resumeList ? resumeModel.resumeList.length : 0});

                // set whether known
                __.known = __.isKnown();
              });

            });


          // Invoke any callback bound with the promise
          __.complete({promise: resp});
        };


        /**
         * editView Initializes resume for user to edit.
         * @return {object} Returns a promise object. To be used by views to
         *                  complete for model before letting user interact with view.
         */
        __.viewEditor = function (metaInfo) {
          var promises = []
            , resp;

          // check if user is authenticated
          if (__.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.viewEditor, [metaInfo])});
            return;
          }

          promises.push(resumeModel.get(metaInfo));
          promises.push(resumeModel.getPreferences(metaInfo.id));
          promises.push(resumeModel.getCountryList());
          promises.push(resumeModel.getStates());

          resp = $q.all(promises);


          // Invoke any callback bound with the promise
          __.edit({promise: resp});

        };


        /**
         *
         * Create a duplicate of an existing resume when user enters a user
         * name for resume.
         *
         */
        __.createDuplicate = function (metaInfo) {
          var modalInstance
            , mScope;

          // check if user is authenticated
          if (__.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.createDuplicate, [metaInfo])});
            return;
          }

          mScope = $scope.$new();

          mScope.submit = function (label) {

            if (label) {
              mScope.inValid = false;

              //resumeModel.save({type: 'new', name: label})
              resumeModel.createDuplicate(metaInfo.id, label)
                // close the modal once the resume is saved
                .then(function () {
                  modalInstance.close();
                })
                .catch(function (err) {
                  mScope.inValid = true;

                  if (err.status === 400) {
                    mScope.error = err.data.fieldErrors[0].errorMessage;
                  }
                  else {
                    mScope.error = 'Oops..something went wrong. Please reload the page and try again.';
                  }
                });
            }
            else {
              mScope.error = 'Resume title cannot be left empty';
              mScope.inValid = true;
            }
          };


          modalInstance = $modal.open({
            templateUrl: '/rb/templates/dup-resume-confirmation.html'
            //, size: 'sm'
            , backdrop: true
            , scope: mScope
          });

          __.complete({promise: modalInstance.result});

        };

        /**
         * deleteResume Deletes current user resume
         * @return {object} Returns a promise object.
         */
        __.confirm = function (metaInfo) {
          // check if user is authenticated
          if (__.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.confirm, [metaInfo])});
            return;
          }

          var tmpScope = $scope.$new();
          tmpScope.question = 'Do you really want to delete the resume?';


          var resp = $modal.open({
            templateUrl: '/rb/templates/delete-resume-confirm.html'
            , size: 'sm'
            , backdrop: true
            , scope: tmpScope
          })
            .result.then(function (bol) {
              if (bol) {
                return resumeModel.delete(metaInfo.id);
              }
            });

          __.complete({promise: resp});
        };


        /**
         * Setup preview parameters on resume model.
         *
         */
        __.viewPreview = function (metaInfo) {
          var p = []
            , resp;

          // check if user is authenticated
          if (__.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.viewPreview, [metaInfo])});
            return;
          }

          // request resume obj and queue it up.
          p.push(resumeModel.get(metaInfo));

          // Make the request to get resume preference and queue it up.
          p.push(resumeModel.getPreferences(metaInfo.id));

          // Wrap the the queued promises into a single promise
          resp = $q.all(p);

          __.preview({promise: resp});

        };


        /**
         * Publish a resume to be public while resetting remaining
         * resumes to private.
         */
        __.publish = function (metaInfo) {

          // check if user is authenticated
          if (__.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.publish, [metaInfo])});
            return;
          }

          var resp = resumeModel.setPreference(metaInfo.id, {'searchable': (metaInfo.privacySetting === 'PRIVATE')})
            .then(resumeModel.getMetaInfo)
            .then(function () {
              __.resumeList = resumeModel.resumeList;
            });

          __.complete({promise: resp});
        };

        function loadMetaInfo(label) {
          var promises = [];

          // filter for currently uploaded doc meta info
          var metaInfo = $filter('filter')(resumeModel.resumeList, {'label': label});

          if (metaInfo.length) {
            metaInfo = metaInfo[0];

            promises.push(resumeModel.get(metaInfo));
            promises.push(resumeModel.getPreferences(metaInfo.id));
            promises.push(resumeModel.getCountryList());
            promises.push(resumeModel.getStates());

            return $q.all(promises);
          }
          else {
            return false;
          }
        }

        function showMaxLimitError() {
          var tmpScope;
          tmpScope = $scope.$new();
          tmpScope.message = 'You have exceeded the maximum number of '+ maxResumeLimit + ' resumes allowed.';
          $modal.open({
            templateUrl: '/rb/templates/resume-limit-error.html'
            , backdrop: true
            , scope: tmpScope
          });
        }

        /**
         * Create a new resume from scratch
         */
        __.fromScratch = function () {
          // check if user is authenticated
          if (angular.isFunction(__.isKnown) && __.isKnown()) {
            (__.authenticate || angular.noop)({callback: __.fromScratch});
            return;
          }

          var modalInstance
            , mScope;

          mScope = $scope.$new();

          mScope.submit = function ($event, label) {
            $event.stopImmediatePropagation();

            if (label) {
              mScope.inValid = false;

              resumeModel.save({type: 'new', name: label})
                .then(function () {
                  return loadMetaInfo(label);
                })
                // close the modal once the resume is saved
                .then(function () {
                  modalInstance.close(resumeModel.resume.meta.id ? 'Success' : 'Fail');
                })
                //.then(resumeModel.init)
                .catch(function () {
                  modalInstance.close();
                  showMaxLimitError();
                });
            }
            else {
              mScope.error = 'Resume title is required.';
              mScope.inValid = true;
            }
          };


          modalInstance = $modal.open({
            templateUrl: '/rb/templates/new-resume-confirmation.html'
            //, size: 'sm'
            , backdrop: true
            , scope: mScope
          });


          __.selectionComplete({promise: modalInstance.result});
        };

        /**
         * Create a new resume by uploading a file
         */
        __.fromFS = function (data) {
          // check if user is authenticated
          if (angular.isFunction(__.isKnown) && __.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.fromScratch, [data])});
            return;
          }

          var promise;
          $scope.uploadError = undefined;

          if (data && data.length) {
            promise = resumeModel.save({type: 'upload', data: data})
              .then(function () {
                return loadMetaInfo($parse('name')(data));
              })
              .then(function () {
                return 'success';
              })
              .catch(function (resp) {
                showMaxLimitError();
                $scope.uploadError = resp.data.fieldErrors[0].errorMessage;
              });

            __.selectionComplete({promise: promise});
          }
        };
      }])
    .directive('apListResumes', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          profileId: '=pid'
          , mini: '='
          , 'edit': '&onEdit'
          , 'preview': '&onPreview'
          , 'size': '&'
          , 'complete': '&onComplete'
          , 'selectionComplete': '&onSelectionComplete'
          , isKnown: '&'
          , 'authenticate': '&'
        },
        templateUrl: '/rb/templates/list-resumes.html',
        controller: 'ResumeListCtrl',
        controllerAs: 'lrCtrl',
        bindToController: true
      };
    });

})(angular);

/**
 * Created by yrganta on 6/3/15.
 */

(function (angular) {
  'use strict';

  angular.module('apollo-resume-editor', [
    'ui.bootstrap'
    , 'resume-builder-tpls'
    , 'resume-model'
    //, 'rte-angular'
    , 'apolloAngularResumeBuilder.InfoTipsContent'
    , 'resume-info-tips'
    , 'ngDragDrop'
    , 'textAngular'
  ])
    .directive('apResumeEditor', function () {

      return {
        restrict: 'E',
        replace: true,
        scope: {
          profileId: '=pid'
          , delete: '&onDelete'
          , preview: '&onPreview'
          , save: '&onSave'
          , fail: '&onFail'
        },
        templateUrl: '/rb/templates/editor.html',
        controller: [
          '$scope'
          , 'resumeModel'
          , '$log'
          , '$uibModal'
          , 'apolloAngularResumeBuilder.config'
          , 'INFOTIPSCONTENT'
          , '$document'
          , '$parse'
          , '$timeout'
          , '$q'
          , '$interval'
          , '$filter'
          , '$rootScope'
          , '$state'
          , 'resume-utils'
          , 'DEFAULT_COUNTRY'
          , function ($scope, resumeModel, $log, $modal, rbConfig, INFOTIPSCONTENT, $document, $parse, $timeout, $q, $interval, $filter, $rootScope, $state, utils, DEFAULT_COUNTRY) {
            var self = this
            // List of available sections the user can add.
              , _sections = {
                'summary': 'summary'
                , 'experience': 'experience'
                , 'education': 'education'
                , 'skills': 'additional info'
              }
            // List of sub sections available to user initially.
              , _skills = {
                 'awards': 'awards'
                , 'certifications': 'certifications'
                , 'personalHobbies': 'hobbies'
                , 'languages': 'languages'
                //, 'hobbies': 'personalHobbies'
                ,'skills': 'skills'
                //, 'volunteer': 'volunteerWork'
                , 'volunteerWork': 'volunteer'
              }
              , _model
              , autoSavePromise;

            self.trans = {
              'skills_subsection': 'skills'
              , 'skills': 'skills'
              , 'awards': 'awards'
              , 'certifications': 'certifications'
              , 'languages': 'languages'
              , 'hobbies': 'personalHobbies'
              //, 'personalHobbies': 'hobbies'
              , 'volunteer': 'volunteerWork'
              //, 'volunteerWork': 'volunteer'
            };

            self.isReady = angular.isObject(resumeModel.resume);
            self.isDirty = false;
            self.defaultCountry = DEFAULT_COUNTRY;

            self.InfoTipsContent = angular.extend({}, INFOTIPSCONTENT);

            // Make a copy of current resume object to decouple it from
            // actual modal use this decoupled model to auto save.
            _model = angular.copy(resumeModel.resume);

            self.init = function () {
              self.resumeMeta = _model.resumeObj;

              //update default values
              resumeModel.updateDefaultValues(_model.resumeObj);
              
              self.resume = _model.resumeObj.resume;
              self.countries = _model.countries;
              self.states = _model.states;

              // Copy over sub sections to controller obj.
              self.skills = angular.copy(utils.sortByValue(_skills));

              // For reasons unknown additional skills have different data types to storing.
              // One accepts and array type and rest are comma separated strings.
              var skills = self.resume.skills;

              for (var skill in skills) {
                if (!angular.isArray(skills[skill])) {
                  skills[skill] = skills[skill].length > 0 ? skills[skill].split(',') : [];
                }
              }

              // Copy over sections and sub sections over to controller for display
              self.sections = angular.copy(_sections);

              var sections = self.resume.sections;

              var nType, nsType;
              // Loop through each section to determine the new list
              // of sections and sub section that user can add.
              sections.forEach(function (sec) {
                nType = sec.type.toLowerCase();

                // Making sure we show sections that user has saved and
                // build the list of sections user can add based on this.
                if (_sections[nType]) {
                  delete self.sections[nType];

                  // If skills is one of the sections that is on their
                  // resume lets go ahead and build the list of sub sections
                  // that can be added.
                  if (nType.toLowerCase() === 'skills' && angular.isArray(sec.subSections)) {
                    sec.subSections.forEach(function (ss) {
                      nsType = ss.type.toLowerCase();

                      if (_skills[self.trans[nsType]]) {
                        delete self.skills[self.trans[nsType]];
                      }
                    });
                  }
                }
              });

              // convert date string of from experience and education sections of resume to string
              self.transformAllDates(self.resume, false);

              $scope.autoSave();

              $scope.$on('$destroy', function () {
                // Make sure that the interval is destroyed too
                $interval.cancel(autoSavePromise);
                // Un register the event listener
                stateChangeListener();
              });

              //CGS-503 Auto save after change in sections order
              $scope.$watch(function () {
                return self.resume.sections;
              }, function (newVal, oldVal) {
                if (!angular.equals(newVal, oldVal)) {
                  self.isDirty = true;
                }
              }, true);

              var leavePage = false;
              var stateChangeListener = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                var tmpModel = angular.copy(_model);
                $scope.transformSkillsArray2Str(tmpModel.resumeObj.resume.skills);
                self.transformAllDates(tmpModel.resumeObj.resume, false, true);

                // Show pop only if there are unsaved changes.
                if (resumeModel.resume.resumeObj && self.isDirty && !leavePage && fromParams.toolId === 'resumeBuilder' && fromParams.viewId === 'editor') {
                  event.preventDefault();

                  self.saveResume()
                    .then(function () {
                      leavePage = true;
                      $state.go(toState, toParams);
                    });
                }
              });
            };

            // Transform all dates to from date/string
            self.transformAllDates = function (obj, convertToStr) {
              // convert date string of from experience and education sections of resume.
              if ($parse('experience.jobs')(obj)) {
                self.transformDate(obj.experience.jobs, 'startDate', 'endDate', convertToStr);
              }

              if ($parse('education.schools')(obj)) {
                self.transformDate(obj.education.schools, 'startDate', 'completionDate', convertToStr);
              }
            };

            // Transform the stored ISO string to date object or string.
            self.transformDate = function (list, prop1, prop2, convertToStr) {
              list.forEach(function (listItem) {
                var tmpDate;

                if (listItem[prop1]) {
                  if (convertToStr) {
                    listItem[prop1] = (listItem[prop1]).toISOString();
                  }
                  else {
                    tmpDate = new Date(listItem[prop1]);
                    tmpDate.setTime(tmpDate.getTime() + tmpDate.getTimezoneOffset() * 60000);
                    listItem[prop1] = tmpDate;
                  }
                }

                if (listItem[prop2]) {
                  if (convertToStr) {
                    listItem[prop2] = listItem[prop2] ? (listItem[prop2]).toISOString() : listItem[prop2];
                  }
                  else {
                    tmpDate = new Date(listItem[prop2]);
                    tmpDate.setTime(tmpDate.getTime() + tmpDate.getTimezoneOffset() * 60000);
                    listItem[prop2] = tmpDate;
                  }
                }
              });
            };

            self.confirmation = function (fn, arrParams, str) {
              var question = 'Do you really want to delete {{?}} from resume?';

              question = question.replace('{{?}}', str);

              var tmpScope = $scope.$new();
              tmpScope.question = question;

              $modal.open({
                templateUrl: '/rb/templates/delete-resume-confirm.html'
                , size: 'sm'
                , backdrop: true
                , scope: tmpScope
              })
                .result.then(function (bol) {
                  if (bol) {
                    return fn.apply(self, arrParams);
                  }
                });
            };

            self.markDirty = function (newVal, propPath) {
              var $resumeParser = $parse(resumeModel.resume);
              if (!self.isDirty && (propPath === undefined || $resumeParser(propPath) !== newVal)) {
                self.isDirty = true;
              }

              // To mark individual input has changed
              return true;
            };

            // Setters and getters for sections and skills sections of resume.
            self.deleteSection = function (name, node) {
              // When deleting a section from resume node add the same
              // to sections available to add list.
              self.sections[name] = _sections[name];

              // Set the node to empty list and delete the section
              // from sections list.
              if (name !== 'skills') {
                self.resume[name][node] = [];
              }
              // Unfortunately skills is a special case.
              else {
                Object.keys(self.resume[name])
                  .map(function (key) {
                    // reset every thing to empty value.
                    self.resume[name][key] = [];
                  });

                // populate the sub section drop down.
                self.skills = angular.copy(_skills);
              }

              self.resume.sections = self.resume.sections.filter(function (section) {
                return section.type.toLowerCase() !== name;
              });

              self.isDirty = true;
            };

            self.addSection = $scope.addSection = function (name) {
              // reset validation state
              $scope.resumeValidated = false;
              $scope.formStatus = '';

              // While adding a selected section to resume node delete
              // the section from available to add list.
              delete self.sections[name];

              // Add the section being added to resume object.
              self.resume.sections.push({
                'type': name.toUpperCase()
                , 'subSections': []
              });
            };

            // Handler for deleting custom section
            self.deleteCustomSection = function (id) {
              self.resume.additionalSections = self.resume.additionalSections.filter(function (section) {
                return section.id !== id;
              });

              self.resume.sections = self.resume.sections.filter(function (section) {
                return section.id !== id;
              });

              self.isDirty = true;
            };

            self.addCustomSection = function () {
              var sectionId = Math.floor(Math.random() * (100)) + 1;

              self.resume.sections.push({'type': 'CUSTOM_SECTION', id: sectionId});

              if (angular.isUndefined(self.resume.additionalSections)) {
                self.resume.additionalSections = [];
              }
              self.resume.additionalSections.push({id: sectionId, section: 'CUSTOM SECTION', content: ''});
            };
            // End of section related methods


            // Add and deleting of sub section related methods:
            self.addSubSection = function (name, node) {
              // NOTE: I think the object comparison is failing because of
              // differing ids that get populated once adding a section.
              var tpl = {
                  jobs: {
                    'employer': '',
                    'address': {'city': '', 'state': '', 'country': DEFAULT_COUNTRY},
                    'startDate': '',
                    'endDate': '',
                    'isCurrent': false,
                    'title': '',
                    'description': '',
                    'id': undefined
                  }
                  , schools: {
                    'details': '',
                    'isAttending': false,
                    'completionDate': '',
                    'startDate': '',
                    'gpa': {'max': 4.0, 'value': ''},
                    'major': '',
                    'qualificationLevel': '',
                    'degreeType': '',
                    'qualification': '',
                    'address': {'city': '', 'state': '', 'country': DEFAULT_COUNTRY},
                    'institution': '',
                    'id': undefined
                  }
                }
                , objRef;

              // Update the school
              // If the section node does not have a node to hold the details of sub section create one.
              // NOTE: We are having to do these because of quirks in the service.
              if (angular.isUndefined(self.resume[name][node])) {
                self.resume[name][node] = [];
              }

              objRef = self.resume[name][node];

              objRef.push(angular.copy(tpl[node]));

              // once we push the node create an id for the newly created
              // node based on its position.

              objRef[objRef.length - 1].id = Math.floor(Math.random() * (100)) + 1;

              self.resume.sections = self.resume.sections.map(function (section) {

                if (section.type.toLowerCase() === name) {
                  // If the sections does not already have a sub section add and list to keep track of them.
                  if (!angular.isArray(section.subSections)) {
                    section.subSections = [];
                  }

                  section.subSections.push({
                    type: section.type.toUpperCase() + '_SUBSECTION'
                    , id: objRef[objRef.length - 1].id
                  });
                }

                return section;
              });
            };

            self.deleteSubSection = function (name, node, pos) {
              var targetSubSection = self.resume[name][node].splice(pos, 1);

              var targetSection = self.resume.sections.
                reduce(function (prev, section) {
                  if (prev.type === name.toUpperCase()) {
                    return prev;
                  }
                  else {
                    return section;
                  }
                }, {});

              targetSection.subSections = targetSection.subSections
                .filter(function (subSection) {
                  return subSection.id !== targetSubSection[0].id;
                });


              self.isDirty = true;
            };

            self.addSkillsSubSection = function (name) {
              delete self.skills[self.trans[name]];

              self.resume.sections = self.resume.sections.map(function (section) {

                if (section.type.toLowerCase() === 'skills') {

                  // If the sections does not already have a sub section add and list to keep track of them.
                  if (!angular.isArray(section.subSections)) {
                    section.subSections = [];
                  }

                  section.subSections.push({
                    type: name === 'skills' ? name.toUpperCase() + '_SUBSECTION' : name.toUpperCase()
                  });
                }

                return section;
              });

              self.resume.skills[self.trans[name]] = [];
            };

            self.deleteSkillsSubSection = function (name) {
              name = name.toLowerCase(); //will be transported name

              self.skills[self.trans[name]] = _skills[self.trans[name]];

              //reorder the skills menu items
              self.skills =  angular.copy(utils.sortByValue(self.skills));

              self.resume.skills[self.trans[name]] = [];

              self.resume.sections.every(function (section) {

                if (section.type.toLowerCase() === 'skills') {
                  section.subSections = section.subSections.filter(function (ss) {
                    return ss.type.toLowerCase() !== name;
                  });
                  return false;
                }

                return true;
              });

              self.isDirty = true;
            };

            self.deleteSkillInput = function (list, index) {
              self.isDirty = true;
              return list.splice(index, 1);
            };

            $scope.addInfoObj = {};
            self.addSkillInput = function (value, list, type, $event) {
              if (value !== '' && ($event.keyCode === 13 || $event.keyCode === 9)) {
                list.push(value);
                $scope.addInfoObj[type] = '';
                self.isDirty = true;
              }
            };

            self.addSkillInputOnBlur = function (value, list, type) {
              if (value !== '') {
                list.push(value);
                $scope.addInfoObj[type] = '';
                self.isDirty = true;
              }
            };

            // End sub section related methods

            // TODO: Rename it to something more appropriate
            // now that the intent has changed.
            self.download = function (cta) {
                var deferred;
                  deferred = $q.defer();
                  self.doAutoSave = false;
                  // need to save resume if is modified before
                  // continue to see Preview
                  if (self.isDirty || $scope.resumeEditor.$dirty) {
                    self.saveResume().then(function() {
                      // Cancel auto save timer, as we may not require it
                      $interval.cancel(autoSavePromise);
                      deferred.resolve();
                    });
                  } else {
                    deferred.resolve();
                  }

                  return deferred.promise.finally(function() {
                    self.preview({
                      promise: undefined,
                      hideEdit: true,
                      cta: cta
                    });
                  });
            };

            $scope.isSaved = true;
            self.saveResume = function () {
              var promise
                , deferred;

              resumeModel.resume = angular.copy(_model);
              $scope.transformSkillsArray2Str(resumeModel.resume.resumeObj.resume.skills);
              self.transformAllDates(resumeModel.resume.resumeObj.resume, true);

              deferred = $q.defer();

              // Cancel auto save timer since we are already in the saving phase.
              $interval.cancel(autoSavePromise);

              promise = resumeModel.update();

              promise.then(function () {
                $scope.saveConfirmMsg = 'Resume saved at ' + $filter('date')(new Date(), 'shortTime');
                self.isDirty = false;
                $scope.resumeEditor.$setPristine();
              })
                .catch(function () {
                  // To reset button state
                  $scope.isSaved = true;
                  $scope.validationError = 'Sorry, there was problem saving your resume at this time please try again later.';
                })
                .finally(function () {

                  // transform all dates to date objects
                  self.transformAllDates(resumeModel.resume.resumeObj.resume);

                  // Restart auto save after user
                  $scope.autoSave();
                  deferred.resolve();
                });

              self.save({promise: promise});

              return deferred.promise;
            };

            $scope.autoSave = function () {
              // Start timer for auto save
              autoSavePromise = $interval(function () {
                // Save only when something has changed.
                if (self.isDirty || $scope.resumeEditor.$dirty) {
                  var tmpModel = angular.copy(_model);
                  $scope.transformSkillsArray2Str(tmpModel.resumeObj.resume.skills);

                  resumeModel.resume = tmpModel;

                  self.transformAllDates(resumeModel.resume.resumeObj.resume, true);

                  // Cancel auto save timer since we are already in the saving phase.
                  $interval.cancel(autoSavePromise);

                  resumeModel.update()
                    .then(function () {
                      self.isDirty = false;
                      $scope.resumeEditor.$setPristine();
                      $scope.saveConfirmMsg = 'Resume saved at ' + $filter('date')(new Date(), 'shortTime');

                      // transform all dates to date objects
                      self.transformAllDates(resumeModel.resume.resumeObj.resume);

                      $scope.autoSave();
                    });
                }
              }, 10000);
            };

            $scope.transformSkillsArray2Str = function (skills) {
              var skill;
              for (skill in skills) {
                if (skill !== 'skills') {
                  skills[skill] = skills[skill].join(',');
                }
              }
            };

            self.updateDate = function (data, obj, prop) {
              if (data) {
                obj[prop] = '';
              }
            };


            $scope.dateConfig = {
              today: new Date()
              , dateOptions: {
                startingDay: 1,
                showWeeks: false,
                minMode: 'month'
              }
            };

            self.validateDate = function (date, markDirty) {
              var today = new Date()
                , startDate
                , endDate;

              startDate = date.start;
              endDate = date.end;


              if (!angular.isDate(startDate) || (!angular.isDate(endDate) && !date.isCurrent)) {
                return 'Please enter the date in specified format';
              }

              //  Check if user has picked a future date.
              if (angular.isDate(startDate) && startDate.getTime() > today.getTime()) {
                return 'You cannot pick a date in future';
              }

              // If current working or attending
              if (!date.isCurrent) {
                if (angular.isDate(endDate) && endDate.getTime() > today.getTime()) {
                  return 'You cannot pick a date in future';
                }

                if (angular.isDate(endDate) && angular.isDate(startDate) && endDate.getTime() <= startDate.getTime()) {
                  return 'End date cannot fall before start date';
                }
              }
              if (markDirty) {
                self.isDirty = true;
              }

            };

            self.isValidGPA = function (gpa) {
              // If no values just return without any validation.
              if (!gpa) {
                return;
              }

              if (!/^\d{1}\.\d{1}$/.test(gpa)) {
                return 'Invalid GPA';
              }

              gpa = parseFloat(gpa);
              if (gpa > 4.0) {
                return 'GPA cannot exceed 4.0';
              }
              self.isDirty = true;
            };

            self.deleteResume = function () {
              var promise;

              promise = resumeModel.delete(resumeModel.resume.meta.id)
                .then(function () {
                  self.isDirty = false;
                });

              self.delete({promise: promise});
            };

            self.isDisabled = function (obj, prop) {
              return obj && !!obj[prop];
            };


            self.test = function () {
              console.log('TEST');
            };
            
            self.emptyState = function (address) {
              if (address.country !== DEFAULT_COUNTRY) {
                address.state = '';
              }
            };

            // Fire a callback if provided to let know the model is unavailable.
            if (!self.isReady) {
              (self.fail || angular.noop)();
            }
            else {
              self.init();
            }
          }
        ],
        controllerAs: 'editorCtrl',
        bindToController: true
      };

    });
})(angular);

/**
 * Created by yrganta on 6/2/15.
 */
(function (angular) {
  'use strict';

  angular.module('apollo-create-resume', [
    'apolloAngularResumeBuilder.config'
    , 'resume-model'
    , 'ui.bootstrap'
    , 'resume-builder-tpls'
    , 'ngFileUpload'
    , 'resume-utils'
  ])
    .controller('CreateResumeCtrl', [
      'resumeModel'
      , '$uibModal'
      , '$scope'
      , '$filter'
      , '$q'
      , '$parse'
      , 'resume-utils'
      , function (resumeModel, $modal, $scope, $filter, $q, $parse, utils) {
        var __ = this;

        __.complete = __.complete || angular.noop;

        // Initialize model for a given profileId.
        resumeModel.init(__.profileId);
        $scope.resumeList = resumeModel.resumeList;

        function loadMetaInfo(label) {
          var promises = [];

          // filter for currently uploaded doc meta info
          var metaInfo = $filter('filter')(resumeModel.resumeList, {'label': label});

          if (metaInfo.length) {
            metaInfo = metaInfo[0];

            promises.push(resumeModel.get(metaInfo));
            promises.push(resumeModel.getPreferences(metaInfo.id));
            promises.push(resumeModel.getCountryList());
            promises.push(resumeModel.getStates());

            return $q.all(promises);
          }
          else {
            return false;
          }
        }

        __.fromScratch = function () {
          // check if user is authenticated
          if (angular.isFunction(__.isKnown) && __.isKnown()) {
            (__.authenticate || angular.noop)({callback: __.fromScratch});
            return;
          }

          var modalInstance
            , mScope;

          mScope = $scope.$new();

          //if resume Resume is created using Action button
          // hide resume list
          resumeModel.showList = false;

          mScope.submit = function ($event, label) {
            $event.stopImmediatePropagation();

            if (label) {
              mScope.inValid = false;

              resumeModel.save({type: 'new', name: label})
                .then(function () {
                  return loadMetaInfo(label);
                })
                // close the modal once the resume is saved
                .then(function () {
                  modalInstance.close(resumeModel.resume.meta.id ? 'Success' : 'Fail');
                })
                //.then(resumeModel.init)
                .catch(function (err) {
                  mScope.inValid = true;

                  if (err.status === 400) {
                    mScope.error = err.data.fieldErrors[0].errorMessage;
                  }
                  else {
                    mScope.error = 'Oops..something went wrong. Please reload the page and try again.';
                  }
                });
            }
            else {
              mScope.error = 'Resume title is required.';
              mScope.inValid = true;
            }
          };


          modalInstance = $modal.open({
            templateUrl: '/rb/templates/new-resume-confirmation.html'
            //, size: 'sm'
            , backdrop: true
            , scope: mScope
          });


          __.complete({promise: modalInstance.result});
        };


        __.fromFS = function (data) {
          // check if user is authenticated
          if (angular.isFunction(__.isKnown) && __.isKnown()) {
            (__.authenticate || angular.noop)({callback: utils.closureFunction(__.fromScratch, [data])});
            return;
          }

          var promise;
          $scope.uploadError = undefined;

          if (data && data.length) {
            promise = resumeModel.save({type: 'upload', data: data})
              .then(function () {
                return loadMetaInfo($parse('name')(data));
              })
              .then(function () {
                return 'success';
              })
              .catch(function (resp) {
                $scope.uploadError = resp.data.fieldErrors[0].errorMessage;
              });

            __.complete({promise: promise});
          }
        };


        __.fromLinkedIn = function () {
          return resumeModel.save({type: 'import'});
        };

      }])
    .directive('apCreateResume', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          profileId: '=pid'
          , complete: '&onComplete'
          , isKnown: '&'
          , 'authenticate': '&'
        },
        templateUrl: '/rb/templates/create-resume.html',
        controller: 'CreateResumeCtrl',
        controllerAs: 'crCtrl',
        bindToController: true
      };
    });

})(angular);

/**
 * Created by yrganta on 9/4/15.
 */

(function (angular) {
  'use strict';

  angular.module('resume-utils', [])
    .factory('resume-utils', [function() {
      return {
        closureFunction: function (func, args) {
          return function () {
            if (angular.isArray(args) && args.length) {
              func.apply({}, args);
            }
            else {
              func();
            }
          };
        },

        sortByValue: function(obj){
          var keyValueArray = Object.keys(obj).map(function(k){
              return [k,obj[k]];
          });

          keyValueArray.sort(function(a, b) {
            return a[1] < b[1] ? -1 : a[1] > b[1]? 1 : 0;
          });

          var sortable = {};
          keyValueArray.forEach(function(a){
           sortable[a[0]] = a[1];
          });
          return sortable;
        }

      };
    }]);

})(angular);

/**
 * Created by yrganta on 5/15/15.
 */

(function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name build-your-resume.resumeModel
   *
   * @description
   *
   * A model that is shared between exercise controller and done controller to interact with
   * actual resume model.
   *
   */
  angular.module('resume-model', [
    'apolloAngularResumeServices.resume'
  ])
    .constant('DEFAULT_COUNTRY', 'United States')
    .factory('resumeModel', [
      '$resumeservice'
      , '$q'
      , '$parse'
      , '$sce'
      , '$window'
      , 'DEFAULT_COUNTRY'
      , function ($resume, $q, $parse, $sce, $window, DEFAULT_COUNTRY) {
        var model = {}
          , profileId
          , initLoading = false
          , initPromise;

        // init
        model.init = function (id) {
          if (!initLoading) {
            profileId = id;
            initLoading = true;
            // Get meta info.
            initPromise = model.getMetaInfo()
              .finally(function () {
                initLoading = false;
              });

            return initPromise;
          }
          else {
            return initPromise;
          }
        };


        // Retrieve model meta info if any available.
        model.getMetaInfo = function () {
          return $resume.list(profileId)
            .then(function (res) {
              model.resumeList = $parse('data.items')(res);

              // NOTE: Not sure what the below code is doing anymore.
              //if (!angular.isArray(resumeList) && resumeList.length) {
              //  // Reject the promise.
              //  return $q.reject('Cannot find an existing resume. No joy...no joy.');
              //}
            });
        };

        // Get the resume model from db.
        model.get = function (metaInfo) {
          model.resume = {
            meta: metaInfo
          };

          return $resume.get({profileId: profileId, docId: model.resume.meta.id})
            .then(function (resumeObj) {
              model.resume.resumeObj = resumeObj.data;
            });
        };

        //set default value for Country as 'United States'
        model.updateDefaultValues = function (resumeObj) {
          var jobs;
          var schools;
          //contact section
          if (!resumeObj.resume.contact.postalAddress.country) {
            resumeObj.resume.contact.postalAddress.country = DEFAULT_COUNTRY;
          }

          //experience
          if (resumeObj.resume.experience && resumeObj.resume.experience.jobs) {
            jobs = resumeObj.resume.experience.jobs;
            angular.forEach(jobs, function(value){
              if (!value.address.country) {
                value.address.country = DEFAULT_COUNTRY;
              }
            });
          }

          //education
          if (resumeObj.resume.education && resumeObj.resume.education.schools) {
            schools = resumeObj.resume.education.schools;
            angular.forEach(schools, function(value){
              if (!value.address.country) {
                value.address.country = DEFAULT_COUNTRY;
              }
            });
          }
        };

        // get model preferences
        model.getPreferences = function (docId) {
          return $resume.getPreferences({profileId: profileId, docId: docId})
            .then(function (preferences) {
              model.resume.preferences = preferences.data;
            });
        };

        // Set preferences
        model.setPreference = function (docId, data) {
          return $resume.setPreference({profileId: profileId, docId: docId, payload: data});
        };

        // get resume templates
        model.getTemplates = function () {
          var that = this;
          return $resume.getTemplates()
            .then(function (templates) {
              that.templates = templates.data.items;
            });
        };

        // set template
        model.setTemplate = function () {
          return this.setPreference(model.resume.meta, {resumeTemplatePreference: this.preferences.resumeTemplatePreference});
        };

        // create, upload or import a resume
        model.save = function (payload) {
          var promise, that;

          that = this;
          // If a resume already exit trigger a request to delete before creating a new.
          //this.delete();

          if (payload.type === 'upload') {
            // upload existing resume
            promise = $resume.upload(profileId, payload.data);
          }
          else if (payload.type === 'import') {
            // import from linkedIn
            promise = $resume.importLinkedIn(profileId);
          }
          else {
            // New resume from scratch.
            promise = $resume.create(profileId, {name: payload.name});
          }

          // Initialize the model before returning.
          return promise.then(model.getMetaInfo);
        };

        model.delete = function (docId) {
          if (docId) {
            return $resume.delete({profileId: profileId, docId: docId})
              .then(model.getMetaInfo);
          } else {
            return $q.reject('Document id required to delete resume!');
          }
        };

        // Save, update data back in db
        model.update = function () {
          var that = this;
          return $resume.update({profileId: profileId, docId: this.resume.meta.id, data: this.resume.resumeObj})
            .then(function (resume) {
              that.resume.resumeObj = resume.data;
            });
        };

        // Update title
        model.updateResumeTitle = function (title) {
          var that = this;

          return $resume.update({
            profileId: profileId
            , docId: this.resume.meta.id
            , data: {
              'name': title
              , 'resume': {}
              , 'primaryInd': 'Y'
              , 'status': 'COMPLETE'
            }
          })
            .then(function (resume) {
              that.resume.resumeObj = resume.data;
            })
            .then(model.getMetaInfo);
        };


        model.getPreviewUrl = function () {
          this.resume.preferences.previewUrl = $resume.previewUrl({
            profileId: profileId,
            docId: this.resume.meta.id,
            template: this.resume.preferences.resumeTemplatePreference || 'classic'
          });
          return this.resume.preferences.previewUrl;
        };

        model.getPreview = function () {
          var promise, that;
          that = this;
          promise = $resume.preview({
            profileId: profileId,
            dociId: this.meta.id,
            data: this.preferences.resumeTemplatePreference
          });
          promise.then(function (res) {
            var htmlElem;
            htmlElem = $window.document.createElement('html');
            htmlElem.innerHTML = res.data;
            // Quick way to retrieve contents of the body.
            that.content = htmlElem.querySelector('body').innerHTML;
            // do some clean up to please angular to insert it back into dom
            that.content = (that.content).replace(/\s+(<)/g, '$1')
              .replace(/(>)\s+/g, '$1')
              .replace(/\s+–\s+/g, ' - ');
            that.content = $sce.trustAsHtml(that.content);
          });
        };

        // Get template.
        model.getTemplates();

        // Make duplicate of a resume.
        model.createDuplicate = function (docId, name) {
          return $resume.duplicate({
            profileId: profileId,
            docId: docId,
            data: {
              name: name,
              primaryInd: 'N'
            }
          })
            // Re get the new list of resumes.
            .then(model.getMetaInfo);
        };

        model.reset = function () {
          delete model.resumeList;
          delete model.resume;
        };


        // get country list
        model.getCountryList = function () {
          return $resume.getCountryList().then(function (response) {
            model.resume.countries = response.data;
          });
        };

        //get US state list
        model.getStates = function () {
          return $resume.getStates().then(function (response) {
            model.resume.states = response.data.result.data;
          });
        };

        return model;
      }]);

})(angular);

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt
(function (angular) {
  'use strict';

// Config
  angular.module('apolloAngularResumeBuilder.config', [])
    .value('apolloAngularResumeBuilder.config', {
      debug: true
      , editorLayout: false
    });


// Modules
  angular.module('apolloAngularResumeBuilder',
    [
      'apolloAngularResumeBuilder.config'
      , 'apollo-sample-resumes'
      , 'apollo-create-resume'
      , 'apollo-list-resumes'
      , 'apollo-resume-editor'
      , 'apollo-preview-resume'
      , 'cgBusy'
      , 'resume-utils'

    ])
    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('/rb/templates/dup-resume-confirmation.html', '' +
        '<div class="container-fluid resume-builder-modal" id="duplicate-resume-modal" role="dialog" aria-label="New resume title" tabindex="0">' +
        '<div class="row">' +
        '<form class="col-md-12" ng-submit="submit(rlabel)">' +
        '<div class="form-group">' +
        '<label for="resume-title" tabindex="-1">Please enter new resume title:</label>' +
        '<input id="resume-title" type="text" placeholder="enter the resume title" class="form-control" ng-model="rlabel" maxlength="75" autofocus>' +
        '</div>' +
        '<div role="alert" class="form-group">' +
        '<small class="col-md-12 alert alert-danger" ng-show="inValid">{{error}}</small>' +
        '</div>' +
        '</form>' +
        '<div class="form-group">' +
        '<div class="col-md-6 text-left"><button class="btn btn-primary"' +
        ' ng-click="submit(rlabel)">Create</button></div>' +
        '<div class="col-md-6 text-right"> <a href="" ng-click="$close();">Cancel</a></div>' +
        '</div>' +
        '</div>' +
        '</div>');


      $templateCache.put('/rb/templates/delete-resume-confirm.html', '' +
        '<div class="container-fluid resume-builder-modal" id="delete-resume-confirmation" role="alertdialog" tabindex="0">' +
        '<div class="row">' +
        '<div class="col-md-12 text-center">' +
        '<p>{{question}}</p>' +
        '<div class="row">' +
        '<div class="col-md-6 text-center"><button class="btn btn-primary" ng-click="$close(true);">Yes</button></div>' +
        '<div class="col-md-6"> <a href="" ng-click="$close();">Cancel</a></div>' +
        '</div>' +
        '</div>');

      $templateCache.put('/rb/templates/new-resume-confirmation.html', '' +
        '<div class="container-fluid resume-builder-modal" id="new-resume-modal" role="dialog" aria-label="New resume title" tabindex="0">' +
        '<div class="row">' +
        '<form class="col-md-12" ng-submit="submit($event, rlabel)">' +
        '<div class="form-group">' +
        '<label for="resume-title" tabindex="-1">Please enter resume title:</label>' +
        '<input id="resume-title" type="text" placeholder="enter the resume title" class="form-control" ng-model="rlabel" maxlength="75" autofocus>' +
        '</div>' +
        '<div role="alert" class="form-group">' +
        '<small class="col-md-12 alert alert-danger" ng-show="inValid">{{error}}</small>' +
        '</div>' +
        '</form>' +
        '<div class="form-group">' +
        '<div class="col-md-6 text-left"><button class="btn btn-primary"' +
        ' ng-click="submit($event, rlabel)">Create</button></div>' +
        '<div class="col-md-6 text-right"> <a href="" ng-click="$close();">Cancel</a></div>' +
        '</div>' +
        '</div>' +
        '</div>');


      $templateCache.put('/rb/templates/confirm-navigation-away.html', '' +
        '<div class="container-fluid resume-builder-modal" role="alertdialog" tabindex="0">' +
        '<div class="row">' +
        '<div class="col-md-12 text-center">' +
        '<p>You are about to leave resume builder, make sure you have saved your work.</p>' +
        '<p>Are you sure you want to leave this page?</p>' +
        '<div class="row">' +
        '<div class="col-md-6 text-right"><button class="btn btn-primary" ng-click="$close(true);">Stay on this Page</button></div>' +
        '<div class="col-md-6 text-left"><button class="btn btn-primary" ng-click="$close(false);">Leave this Page</button></div>' +
        '</div></div>');
      
      $templateCache.put('/rb/templates/resume-limit-error.html', '' +
          '<div class="container-fluid resume-builder-modal" id="resume-maxlimit-error" role="alertdialog" tabindex="0">' +
          '<div class="row">' +
          '<div class="col-md-12">' +
          '<p>{{message}}</p>' +
          '<div class="row flatten">' +
          '<div class="col-md-6"><button class="btn btn-primary" ng-click="$close(true);">Okay</button></div>' +
          '<div class="col-md-6"></div>' +
          '</div>' +
          '</div>');
    }]);

})(angular);
