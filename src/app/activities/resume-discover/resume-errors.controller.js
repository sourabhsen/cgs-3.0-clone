(function() {
  'use strict';
  angular.module('resumeErrors', [
      'apollo-coach-marks',
    ])
    .controller('ResumeErrorsController', [
      function() {
        var ctrl = this;
        ctrl.coachMarks = {
          walkthrough: {
            showCurtain: false,
            start: true,
            steps: [{
              type: 'element',
              selector: '#cm-resume',
              heading: 'Use Appropriate Fonts',
              text: 'Use a font which does not look like you\'ve bolded the whole resume.',
              placement: 'bottom',
              arrowPosition: 'none'
            }, {
              type: 'element',
              selector: '#cm-contact-info',
              heading: 'Unprofessional Contact Info',
              text: 'Use a professional email address with your first and last name for all job applications.  An email address is not a place to get creative.',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cm-objective',
              heading: 'Loose Objective Statements',
              text: 'Objective statements are outdated and don\'t add anytime positive to your application. Instead of an objective statement, add a "Summary of Qualifications", which highlights your achievements in 3-5 short bullets.',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cm-education',
              heading: 'Add an Education Section',
              text: 'The "Education" section is missing from this resume.  You should add this section and highlight your degree as well as specific courses that are relevant for the role.',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cm-spelling',
              heading: 'Misspelled Words',
              text: 'There are multiple misspelled words on this resume including "adminstrative" and "companys".  Make sure to use spell check and also re-read the resume word for word.  Even spell check won\'t catch everything (example: incorrect use of too, to, two).',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cm-dates',
              heading: 'Proper Use of Dates',
              text: 'You should use months and years for the resume.  (Example: May 2006 - March 2008).  Leaving off months may hint to the company that you are hiding something.',
              placement: 'top',
              arrowPosition: 'bottom'
            }, {
              type: 'element',
              selector: '#cm-bullets',
              heading: 'Bullets and Action Verbs',
              text: 'Use bullets instead of paragraphs to describe your experience.  It\'s easier to read and allows you to highlight more accomplishments.  For each bullet, use action verbs that highlight what you achieved and what impact it had on the organization.',
              placement: 'top',
              arrowPosition: 'bottom',
              scroll: true
            }, {
              type: 'element',
              selector: '#cm-leadership',
              heading: 'Relevant Info',
              text: 'Unless you are lacking in work experience, you should not focus the resume on leadership experiences.  If you want to highlight volunteer work, you can create a section called "Additional Information and Skills" and have a bullet on volunteer work.',
              placement: 'top',
              arrowPosition: 'bottom',
              scroll: true
            }, {
              type: 'element',
              selector: '#cm-references',
              heading: 'Move The References',
              text: 'It is not customary to add references to a resume.  Have a document prepared with references in case an employer asks for them but omit them from your resume.',
              placement: 'top',
              arrowPosition: 'bottom',
              scroll: true
            }]
          }
        };
      }
    ]);
})();
