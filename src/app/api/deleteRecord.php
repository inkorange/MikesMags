<?php
	require "db_initialize.php";
	$id = $_POST['id'];

    $sql = "DELETE FROM magazines WHERE id=" . $id;
    $sqlResult = mysql_query($sql);
?>
