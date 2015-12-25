
## Introduction

`cgs-angular` is standards-based, so it uses all the usual tools to manage
and develop client-side code. If you've developed modern, highly-organized
JavaScript projects before, you are probably already familiar with at least most
of these tools. What follows is a simple description of the tools of which this
project makes use and how they fit in to the `cgs-angular` picture.



## All the instruction in this file are targeted towards the Mac OS X


## Getting up cgs-angular running on your localhost by type following commands in the terminal:

1. Make sure you have npm (Node package manager) installed on your machine. To install nodejs on you machine see the instructions under installing nodejs below.

2. sudo npm -g install bower gulp  (May have to change the permission on the directory to enable read, write and execute on for owner and group)

3. sudo npm install gulp-util --save-dev

4. npm install

5. bower install

6. Change the permission on your /etc/hosts file. (sudo chmod 646 /etc/hosts)

7. In your choice of editor please install the following plugin 'EditorConfig'.
   If you are using sublime text you can install it through package manager and this project is supported by most notable
   IDE's

8. gulp serve


## windows user please follow the below instuctions

1. Install nodejs from http://nodejs.org/download/
   Make sure you select the option to install the npm package manager and also add the npm to path.

2. Run cmd as Administrator (Start -> Accessories -> Right Click on Command Prompt -> Run as Administrator)

3. run 'npm install'

4. Install MSFT .Net Framework 2.0 SDK and Windows SDK for Windows 7 and .Net Framework 4

5. Add folder path to VCBuild.exe - to the PATH environment variable

6. run 'npm -g install gulp bower'

7. Download & Install Git.

8. 'bower install' (If any of you see an error like "npm cb() never called" try running this command `npm cache clean` and rerun the step 3)

9. Change the permission of the file C:\Windows\System32\drivers\etc\hosts by right clickin on it and selecting user group and checking the write permission checkbox and clicking ok.

10. In your choice of editor please install the following plugin 'EditorConfig'.
   If you are using sublime text you can install it through package manager and this project is supported by most notable
   IDE's i.e. npm install editorconfig


11. gulp serve


## Installing Node.js & NPM

[Node.js](http://nodejs.org) is a platform based on Chrome's JavaScript runtime,
called [V8](http://code.google.com/p/v8/). It allows you to develop all kinds of
software using the JavaScript you already know and love.

A great feature of Node.js is its wide variety of existing libraries and tools.
As the developer community is absolutely massive and incredibly active, Node.js
has a basic package manager called NPM that you can use to install Node.js-based
software and libraries from the command line.

`package.json` is an NPM package description file written in JSON. It contains
basic metadata about your application, like its name, version, and dependencies.
By default, several packages are required for the build process to work; so when
you first start with `bootcamp` you have to tell NPM to install the
packages; this is covered in detail in the [main README](README.md). Some of
the required packages are Grunt build tasks (see below), while others are
command-line tools either we (or the build system) need, like Karma, Grunt, and
Bower.

1. Install Homebrew package manager for mac by running following command in terminal:

```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Install node using brew package manager. We can type:

```sh
$ brew install node
```
Learn usage of npm, we can just type:

```sh
$ npm --help
```


## gulp

[gulp](http://gulpjs.com/) is a stream-based JavaScript task/workflow runner that runs on top of
Node.js. Most importantly, Grunt brings us automation. There are lots of steps
that go into taking our manageable codebase and making it into a
production-ready website; we must gather, lint, test, annotate, and copy files
about. Instead of doing all of that manually, we write (and use others') gulp
tasks to do things for us.



## Bower

[Bower](bower.io) is a package manager for the web. It's similar in many
respects to NPM, though it is significantly simpler and only contains code for
web projects, like Twitter Bootstrap and its AngularJS counterpart Angular
Bootstrap. Bower allows us to say that our app depends in some way on these
other libraries so that we can manage all of them in one simple place.



## AngularJS

[AngularJS](http://angularjs.org/) is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs.



## SCSS

[Sass](http://sass-lang.com/) is an extension of CSS that adds power and elegance to the basic language. It allows you to use variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized, and get small stylesheets up and running quickly, particularly with the help of the Compass style library.

### Standards
- Refer to [Style Guide](http://css-tricks.com/sass-style-guide/) for our general Sass standards.



## Jasmine & Karma 

[Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html)

Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.

[Karma](http://karma-runner.github.io/0.10/index.html)

Karma is a test runner agnostic to any testing framework which can be used to run the tests and get instant feedback.



## Sublime Text Plugins
To easily install Sublime Text plugins, follow the installation instructions at [Package Control Installation](https://packagecontrol.io/installation).

To properly configure your editing environment and maintain code consistency, be sure to install the following plugins:
- [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime) - Helps us maintain consistent coding styles.
- [SublimeLinter3](https://github.com/SublimeLinter/SublimeLinter3) Code linter. Shows code errors as you type.
- [SublimeLinter-jshint](https://github.com/SublimeLinter/SublimeLinter-jshint) - Javascript support for SublimeLinter. Be sure to follow the installation instructions and install jshint ('npm -g install jshint').
- [SublimeLinter-contrib-htmlhint](https://github.com/mmaday/SublimeLinter-contrib-htmlhint) - HTML support for SublimeLinter. Be sure to follow the installation instructions and install jshint ('npm -g install htmlhint').
- [Sublime-HTMLPrettify](https://github.com/victorporof/Sublime-HTMLPrettify) - HTML, CSS, JavaScript and JSON code formatter for Sublime Text 2 and 3 via node.js. Our project has a standard .jsbeautifyrc defined so everyone can format their code the same.


Here are additional (optional) plugins that team members have found handy in their development efforts:
- [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements) - Enhances the sidebar, adding lots of functionality.
- [Modific](https://github.com/gornostal/Modific) - shows you what’s changed since your last check-in.  Note: sometimes this plugin will collide with SublimeLinter, since they both show in the gutter.
- [SublimeCodeIntel](https://github.com/SublimeCodeIntel/SublimeCodeIntel) - Adds code auto-complete and other features.


## Tips & Tricks

<!--- - Starting the server using this command helps removing the localhost mapping on exit
  `grunt serve; grunt pristine;` -->

<!--- - Bootcamp servers:
  bootcamp01.devint.aptimus.net
  bootcamp02.devint.aptimus.net -->

- Newer version of Mac OS don't come with subversion binaries installed so please follow the instructions at
  http://wbond.net/sublime_packages/svn/installation to be able to use sublime subversion plugin.

- When running watch you may see "Warning:  EMFILE, too many open files"  To fix, add this to your .bashrc or .bash_profile:
  ```sh
  # up max files
  ulimit -n 4096
  ```
  
  Run the same for any open terminals for it to take effect immediately.
  
  To display the current value, run `ulimit -a`. It's very low by default.
   

___
**Happy programming!**
