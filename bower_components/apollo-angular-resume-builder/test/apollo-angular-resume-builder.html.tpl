<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Index file to test resume builder</title>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot"/>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg"/>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf"/>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff"/>
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"/>


  <!-- bower:css -->
  <!-- endbower -->

  <!-- inject:css -->
  <!-- endinject -->
</head>
<body>

<!-- bower:js -->
<!-- endbower -->

<!-- inject:js -->
<!-- endinject -->

<div ng-app="response-stubs">

  <div ng-controller="test as t">


    <p>Sample resume section of directive</p>
    <ap-sample-resumes num-rows="3"></ap-sample-resumes>

    <hr/>
    <p>Create a new resume options</p>
    <ap-create-resume pid="'27e6d24a-0010-4dde-9be4-2f2baf313a78'"></ap-create-resume>

    <hr/>
    <p>Full version of resume list</p>
    <ap-list-resumes pid="'27e6d24a-0010-4dde-9be4-2f2baf313a78'" on-edit="t.afterEdit(size)"
                     on-preview="t.previewResume()"></ap-list-resumes>

    <hr/>
    <p>Stripped down version of resume list for dashboard</p>
    <ap-list-resumes pid="'27e6d24a-0010-4dde-9be4-2f2baf313a78'" mini="true" on-edit="t.afterEdit(size)
    "></ap-list-resumes>


    <div ng-if="t.editor">
      <hr/>
      <p>The editor view</p>
      <ap-resume-editor pid="'27e6d24a-0010-4dde-9be4-2f2baf313a78'"></ap-resume-editor>
    </div>

    <div ng-if="t.preview">
      <hr/>
      <p>Preview view</p>
      <ap-preview-resume></ap-preview-resume>
    </div>


  </div>
</div>

</body>
</html>
