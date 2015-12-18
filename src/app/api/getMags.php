[
<?php
    //header('Access-Control-Allow-Origin: *');
	require "db_initialize.php";
    $sql = "SELECT * FROM magazines ORDER BY date desc";
    $cnt = 0;
		$result = mysql_query($sql);
		if (mysql_num_rows($result) > 0)
		{
			while ($row = mysql_fetch_assoc($result))
			{
                if($cnt > 0) {
                echo ",";
                }
                echo "{";
                    echo "\"id\":". $row["id"] . ",";
                    echo "\"publisher_id\":". $row["publisher_id"] . ",";
                    echo "\"summary\": \"". $row["summary"] . "\",";
                    echo "\"date\": \"". $row["date"] . "\",";
                    echo "\"image\": \"". $row["image"] . "\",";
                    echo "\"price\": \"". $row["price"] . "\",";
                    echo "\"condition\": \"". $row["condition"] . "\"";
                echo "}";
                $cnt++;
			}
		}
?>
]