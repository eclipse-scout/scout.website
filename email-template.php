<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>Contact Form</title>
	<style>
	th { text-align: right; vertical-align: top; width: 100px; }
	td { width: 200px; }
	</style>
</head>
<body>
There is new submission from the <a href="//<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>">contact form on your website</a>. 

<table border="1" cellspacing="0" style="border-collapse: collapse; " >
	<tr>
		<th>First Name</th>
		<td><?php echo htmlspecialchars($first_name); ?></td>
	</tr>
	<tr>
		<th>Last Name</th>
		<td><?php echo htmlspecialchars($last_name); ?></td>
	</tr>
	<tr>
		<th>Email</th>
		<td><?php echo htmlspecialchars($email); ?></td>
	</tr>
	<tr>
		<th>Phone</th>
		<td><?php echo htmlspecialchars($phone); ?></td>
	</tr>
	<tr>
		<th>Message</th>
		<td><?php echo htmlspecialchars($message); ?></td>
	</tr>
	<tr>
		<th>Newsletter</th>
		<td>
			<?php 
			$answer = '';
			if ($has_newsletter == 'YES') {
				$answer = 'yes';
			} else {
				$answer = 'no';
			}
			echo $answer;
			?>
		</td>
	</tr>
</table>
</body>
</html>