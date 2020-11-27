<?php

include "merchant/helpers/settings.php";    
    if(isset($_POST["email"])){
/* 		$data = array(
				emailAddress=>$_POST["email"]
			);
		
		$jsonData = json_encode($data); */
		$ch = curl_init($apiBaseUrl.'Account/ResetPasswordLink?emailAddress=' . $_POST["email"]);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
		/*curl_setopt($ch, CURLOPT_HEADER, true);
		curl_setopt($ch, CURLOPT_NOBODY, true); */
		curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_CAINFO, getcwd() . $certPath);	                                                                      
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
			'Content-Type: application/json',                                                                                
			'Content-Length: '. strlen($jsonData),
			'Authorization: Bearer ' . $_SESSION["token"])
		);
		
		$postResult = curl_exec($ch);
		$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$jsonPostResult = json_decode($postResult);
		if($httpcode=="200" && $jsonPostResult->status && $jsonPostResult->message=="Reset Password Link Successfully Sent."){
			$success="Reset Password Link Sent";
		}
		else{
            $error="Email address not recognised";
		}
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>E-Pay Merchant Services</title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" href="css/fontawesome.min.css">
	<link rel="stylesheet" href="css/bootstrap.min.custom.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body class="">
<div class="container h-100 pt-5">
	<div class="row h-100 d-flex justify-content-center">
		<div class="col-sm-10 col-md-6 col-lg-4">
		
			<div class="card bg-white border-0">
				<div class="card-body">
				<div class=" text-center">
			<img src="images/logo-epay-full.png" width="100" alt="E-Pay logo"/>
				<p><h4> Agent Center </h4></p>
				<p class="text-muted"> Forgot Password </p>
			</div>

			<?php
                if(isset($success)){
                    echo "<div class='alert alert-success text-center'>" . $success . "</div>";
                }
				if(isset($error)){
					echo "<div class='alert alert-danger text-center'>" . $error . "</div>";
				}
			?>
					<form id="forgot-password-form" autocomplete="off" action="forgotpassword.php"  method="POST">

						<div class="form-group">
							<label for="number"> Enter Registered Email </label>
							<input class="form-control" id="email" type="text" name="email" placeholder="" required>
						</div>

						<div class="form-group">
							<button id="login" type="submit" class="btn btn-success btn-block"> Send Reset Link </button>
						</div>
					</form>

                    
						<div class="form-group float-right">
							<a href="index.php"> Go back to Login </a>
						</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>
