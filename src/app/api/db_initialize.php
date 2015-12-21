<?php

$myServer = "127.0.0.1"; // "mysql1.myregisteredsite.com";
$myUser = "root";
$myPass = "root";
$myDB = "mikesmags";

$dblink = mysql_connect($myServer, $myUser, $myPass);
if(!$dblink) {
	echo "could not connect to " . $myServer;
}
mysql_select_db($myDB, $dblink);

function CleanSQL($string)
{
	if(get_magic_quotes_gpc())
	{
		$string = stripslashes($string);
	}
	return mysql_real_escape_string($string);
}

?>
