<?php 
$message_recepient = "scout@bsi-software.com";

$error_msgs = array();
$form_sent = false;

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	$form_sent = true;
	$first_name = !empty($_POST['fname']) ? $_POST['fname'] : '';
	$last_name = !empty($_POST['lname']) ? $_POST['lname'] : '';
	$email = !empty($_POST['email']) ? $_POST['email'] : '';
	$phone = !empty($_POST['phone']) ? $_POST['phone'] : '';
	$message = !empty($_POST['message']) ? $_POST['message'] : '';
	$has_newsletter = !empty($_POST['newsletter']) ? 'YES' : '';


	if(strlen($first_name) < 2) {
		$error_msgs[] = "Invalid Full name";
	}

	if(strlen($last_name) < 2) {
		$error_msgs[] = "Invalid Full name";
	}

	if (!preg_match('/^.*@.*\..*$/i', $email)) {
		$error_msgs[] = "Invalid email";	
	}

	if (empty($error_msgs)) {
		ob_start();
		include('email-template.php');
		$email_message = ob_get_clean();
		$subject = 'Scout Homepage Query';
		$mail_content = $email_message;

		// To send HTML mail, the Content-type header must be set
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'From: no reply <no-reply@eclipse.org>' . "\r\n" .
			'Reply-To: no-reply@eclipse.org\r\n' .
			'X-Mailer: PHP/' . phpversion();

		$result = @mail($message_recepient, $subject, $mail_content, $headers);

		if (!$result) {
			$error_msgs[] = "We couldn't send your message. Please try again later or contact us directly at <a href='mailto:$message_recepient'>$message_recepient</a>";
			echo $error_msgs[0];
		} else { 
			echo "Your message has been sent.";
		}

	}
}

