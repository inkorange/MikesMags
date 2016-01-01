[
<?php
    //header('Access-Control-Allow-Origin: *');
	require "db_initialize.php";

	$magid = $_GET['magid'];
    $search = $_GET['search'];

    if($magid != "" && $magid != 0) {
        $searchStr = "WHERE publisher_id=" . $magid;
    }
    if($search != "") {
        if($magid != "" && $magid != 0) {
            $searchStr .= " AND ";
        } else {
            $searchStr .= " WHERE ";
        }
        $searchStr .= " summary LIKE \"%".$search."%\" ";
    }

    $sql = "SELECT * FROM magazines ".$searchStr." ORDER BY date desc";
    //echo $sql;
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