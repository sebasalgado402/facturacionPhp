<?php
    $conexion = mysqli_connect("localhost", "root", "","parcial");
        if(!$conexion){
            echo "no se ha conectado a la base de datos";
        }

?>