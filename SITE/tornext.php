<?php

    $servername = "servername";
    $username = "username";
    $password = "password";
    $db_name = "db_name";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $db_name);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    //IF REQUEST_METHOD is GET I need to return data
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        
        //Selecting data from databse
        $sql = "SELECT timestamp, country, item, quantity, price FROM travlerun"; //change SQL to use fileds from database
        //Execute query
        $result = $conn->query($sql);
        
        //if we have result form sql query
        if ($result->num_rows > 0) {
            //Create output array this is associtaive array that have country as key and object that contain timestamp and array of supplies {item, quantity, price}
            $results = array();
            //output data of each row
            while($row = $result->fetch_assoc()) {
                
                $results[$row["country"]]["timestamp"] = (int)$row["timestamp"]; //timestime should be same for all rows for country and it used as global value for all supplies for that country
                //checking is suplyes are already defined
                if(!array_key_exists("supplies", $results[$row["country"]])){
                    //If suppies are not defined i defind them as empty array
                    $results[$row["country"]]["supplies"] = array();
                }
                //Adding item with quantity and price to array
                array_push($results[$row["country"]]["supplies"], array( "item_id" => (int)$row["item"], "units" => (int)$row["quantity"], "price" => (int)$row["price"]));
            }
            //returnig result as json
            echo json_encode($results);
            
        }
    }
    
    //IF REQUEST_METHOD is POST I need to colect data from body and store it to datyabase
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $body = file_get_contents('php://input'); //Reading body of request
        $data = json_decode($body); //Converting body to json
        $time = time(); //getting current time - this time will be used as timestamp for when data is updated
        
        //SQL for storing data to database
        $stmt = $conn->prepare("REPLACE INTO travelrun (timestamp, country, item, quantity, price) VALUES (?, ?, ?, ?, ?)"); //change SQL to use fileds from database
        //Binding variables to query
        $stmt->bind_param("isiii", $timestamp, $country, $item, $quantity, $price); 

        //SQL for updating all data that i dodnt recieved - if i didnt recieved it, its not on market, so it needs to be set to 0
        $stmt2 = $conn->prepare("UPDATE travelrun set timestamp = ?, quantity = 0 where country = ? and timestamp <> ?"); //change SQL to use fileds from database
        //Binding variables to query
        $stmt2->bind_param("isi", $timestampu1, $countryu, $timestampu2);
        
        //Looping trought all recieved data
        foreach($data as $key => $value){
            //here $key represent country and value represent all items for that country
            foreach($value as $items){
                // set parameters and execute
                $timestamp = $time; //setting server timestamp that was previously aquired
                $country = $key; //setting values for country 
                $item = $items->item_id; //setting itme id
                $quantity = $items->units; //setting quantity 
                $price = $items->price; //setign price
                $stmt->execute(); //executing query
            }
            
            //now i will update all remaining items to quantity 0 and new timestamp by using second preprated SQL

            $timestampu1 = $time; //setting server timestamp that was previously aquired
            $timestampu2 = $time; //setting server timestamp that was previously aquired
            $countryu = $key; //setting value for country
            $stmt2->execute(); //executing query
        }
        
        $stmt->close(); //colsinf replace statement
        
        $stmt2->close(); //colsing update statement for all not recived items
    }
    
    $conn->close(); //colsing connection to database
?>