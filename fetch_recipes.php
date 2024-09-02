<?php
// fetch_recipes.php
include 'db_connect.php';

$sql = "SELECT id, name, description, image_url FROM recipes";
$result = $conn->query($sql);

$recipes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $recipes[] = $row;
    }
}
$conn->close();

echo json_encode($recipes);
?>
