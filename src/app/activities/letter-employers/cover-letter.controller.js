(function() {
  'use strict';
  angular.module('coverLetter', [
      'apollo-coach-marks',
    ])
    .controller('CoverLetterController', [
      function() {
        var ctrl = this;
        ctrl.coachMarks = {
          walkthrough: {
            showCurtain: false,
            start: true,
            steps: [{
              type: 'element',
              selector: '#cl-contact',
              text: 'Added his contact information (name, email) in the header of the cover letter.',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cl-address',
              text: 'The cover letter is addressed to a specific person.  Usually this is the recruiter who posted the position or the hiring manager.',
              placement: 'bottom',
              arrowPosition: 'top'
            }, {
              type: 'element',
              selector: '#cl-objective',
              text: 'Make sure to do your research and include relevant information to show your understanding of the role and company.',
              placement: 'bottom',
              arrowPosition: 'top',
              scroll: true
            }, {
              type: 'element',
              selector: '#cl-skills',
              text: 'Mark took the three most relevant skills from the job description and clearly articulated his achievements for each of the skills.',
              placement: 'bottom',
              arrowPosition: 'top',
              scroll: true
            }, {
              type: 'element',
              selector: '#cl-attachment',
              text: 'Let the reader know that your resume is attached and provide your contact information.',
              placement: 'top',
              arrowPosition: 'bottom',
              scroll: true
            }, {
              type: 'element',
              selector: '#cl-spelling',
              text: 'Mark has ensured that the cover letter is free of spelling and grammar mistakes.',
              placement: 'top',
              arrowPosition: 'bottom',
              scroll: true
            }]
          }
        };
      }
    ]);
})();
