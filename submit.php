<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Store the message in a text file
  $file = 'name.txt';
  $name = $_POST['name'];
  file_put_contents($file, $name . PHP_EOL, FILE_APPEND);

  // Read all the names from the file
  $allNames = file_get_contents($file);

  // Increment the counter
  $counterfile = "counter.txt";
  $counter = file_get_contents($counterfile);
  $counter++;
  file_put_contents($counterfile, $counter);

  // Return a success message with the list of names
  echo "<br>";
  echo "Vielen Dank, " . $name . "! Dein Name ist jetzt in der Matrix. <br>";
  echo "<br>";
// echo "Counter: " . $counter . "<br>";
echo "Alle Einträge: " . "<br>" . nl2br($allNames);  //nl2br to make the entires under eachothers

}
?>
 