<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/contacts.php';

// instantiate database and contact object
$database = new Database();
$db = $database->getConnection();

// initialize object
$contact = new Contact($db, "contacts");

// get keywords from url query string
//$keywords=isset($_GET["s"]) ? $_GET["s"] : "";

$data = json_decode(file_get_contents("php://input", true));

// query contacts
$stmt = $contact->search($data);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // contacts array
    $contacts_arr=array();
    $contacts_arr["records"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $contact_item=array(
            "id" => $id,
            "name" => $name,
            "phone" => $phone,
            "address" => $address,
        );

        array_push($contacts_arr["records"], $contact_item);
    }

    echo json_encode($contacts_arr);
}

else{
    echo json_encode(
        array("message" => "No contacts found.")
    );
}
?>
