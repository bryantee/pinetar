<?php
// Get External Information from MLB.com servers

date_default_timezone_set('America/Adak');

$currentYear = date('Y');
$currentMonth = date('m');
$currentDay = date('d');

$localFile = "mlb-scoreboard.json";
$fileWrite = fopen($localFile, 'w') or die("Error: can't open file.");
$stringData = file_get_contents("http://mlb.mlb.com/gdcross/components/game/mlb/year_".$currentYear."/month_".$currentMonth."/day_".$currentDay."/master_scoreboard.json");
fwrite($fileWrite, $stringData);
fclose($fileWrite);
?>
