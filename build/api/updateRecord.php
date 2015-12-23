<?php
	require "db_initialize.php";

	$id = $_POST['id'];
	$price = $_POST['price'];
	$summary = $_POST['summary'];
	$publisher_id = $_POST['publisher_id'];
	$date = $_POST['date'];
	$condition = $_POST['condition'];
	$id = $_POST['id'];

    $sql = "INSERT INTO magazines (id, summary, publisher_id, price, `date`, `condition`) VALUES";
    $sql .= " (" . $id . ",'".$summary."', ".$publisher_id.", ".$price.", '".$date."', '".$condition."')";
    $sql .= " ON DUPLICATE KEY UPDATE summary='".$summary."', publisher_id=".$publisher_id.", price=".$price.", `date`='".$date."', `condition`='".$condition."'";
    echo 'SAVE SQL: ' . $sql;
    $sqlResult = mysql_query($sql);
?>
