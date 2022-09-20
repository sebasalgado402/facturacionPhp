<?php
    $conexion = mysqli_connect("localhost", "root", "","sfact");
        if(!$conexion){
            echo "no se ha conectado a la base de datos";
        }

?>