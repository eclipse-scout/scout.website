<?php
const DOC_BASE_URL = 'https://eclipsescout.github.io/10.0/';

$title = null;
$url = null;
$docId = $_GET['doc'];

if ($docId == 'helloworld') {
	$title = 'The Scout "Hello World!"';
	$url = DOC_BASE_URL . 'helloworld.html';
} else if ($docId == 'install') {
	$title = 'Download and Install Eclipse Scout';
	$url = DOC_BASE_URL . 'install-guide.html';
} else {
	http_response_code(404);
	echo '404 - Document does not exist';
	die();
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="BSI Business System Integration AG">
    <title><?php echo $title; ?></title>
  </head>
	<body class="popup-body">
	  <h2 class="popup-title"><?php echo $title; ?></h2>
	  <iframe class="popup-iframe" src="<?php echo $url; ?>"></iframe>
  </body>
</html>	