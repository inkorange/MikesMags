<?php
    require 'PHPMailerAutoload.php';
    $mail = new PHPMailer;

	$message = $_POST['message'];
	$name = $_POST['name'];
	$email = $_POST['email'];

    //echo "SEND: " . $name . " | " . $email . " | " . $message;

    $mail->SMTPDebug = 3;

    $mail->setFrom($email, $name);
    $mail->addAddress('mikesmags@gmail.com');               // Name is optional
    $mail->addAddress('thrillgraphics@gmail.com');     // Add a recipient
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'request from MikesMags';
    $mail->Body    = 'You got an email from someone online from MikesMags.com:  ' . $message;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
?>
