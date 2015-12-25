#Lessons we learned building Bootcamp

* jsBeautify

## Open for discussion
 * terminolgy the use of modules vs. components 
 * use of ES6 arrow operator/anonymous functions
  * PRO - is shorter to write
  * CON - is that functions will always evaluate to anonymous, anonymous functions are hard to debug in stacktraces. Ideally all functions should have names associated with them, even callbacks, for the stacktrace value.
 * Style of decalring all variable names at the top of a block of code.
 * Use of RESTAngular (and refactor services to use), Resource is limited and most of the time we found ourselves using $http

## File Organization

### directives/shared directory

Keep a directory inside of your application modules for shared directives. It looks like the 'components' directory serves this purpose.


### shared modules vs application specific code

Separate shared modules from application specific modules into two top level directories so that it is easy to indentify which modules are not specific to the app. If we user bower to shared modules this problem would be solved as the shared shared modules would be placed into a bower_components directory.

## Naming Conventions

### File names

Files names should start with their module name and end with their functional purpose, i.e. login-controller.js, or login.controller.js

### Module Names

Use a namespace, we had started using apollo- for service modules, possibly shorten that to 'ap-'?

### Function Names

Just need to decide on some conventions. We were using the shortened 'Ctrl' for controllers and we varied between 'somethingService' and 'somethingModel' for factory/services. Some of our directives start with 'apDirectiveName' and some do not. Filters did not use any convention.

## Coding Conventions

### Explicit Injection

We found out the hard way that use of explicit injection is the best way to avoid minification errors. Explicit injection meaning passing in dependencies into controllers, services etc as both a string reference and a function argument like 

    app.controller('someCtrl', ['$dependency', 
      function(dependency) {
    
      }
    ])

### Thin Controllers

Use of Factory/Services to create 'models' which contain functions and configs that controllers can consume. We started using this convention about half way through Bootcamp  and it has helped make the code easier to test and share across modules. A good example of an extremely thin controller and a thick service is /Apollodev/source/trunk/app/modules/exercises/meet_cohort/meet-cohort-controller.js, you can see how small the 'MeetCohortCtrl' on line 155 is, it just instantiates the model and holds a scope. 

### ui-router grant for managing router permissions - don't use onEnter or stateChange

We had initially used onEnter function on a route to determnine permissions etc but found that it was loading controllers and then doing checks, so we switched to a module called ui-router-grant

### Chaining Promises

I don't want to write out how to use promises here, maybe someone else would like to add that, but the point is to learn how promises and promise chaining, error catching, rejecting resolving etc work.






