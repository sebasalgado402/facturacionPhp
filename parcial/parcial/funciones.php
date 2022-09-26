
<?php
    
    function desconectarBD($conexion){
        mysqli_close($conexion);
    }

    function iniciarSession(){
        session_start();
    }

    function recargar(){
        reload();
    }

    function mostrarArticulos($conexion){
        

            // 2) Preparar la orden SQL
            $consulta= "SELECT*FROM articulos";

            // puedo seleccionar de DB
            $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );

            // 3) Ejecutar la orden y obtener datos
            $datos= mysqli_query ($conexion,$consulta);

            // 4) Ir Imprimiendo las filas resultantes
            $i = 1;
            while ($fila =mysqli_fetch_array($datos)){
                echo'
                <tr>
                    <th scope="col-1">'.$i++.'</th>
                    <th scope="col-1">'.$fila ["id_articulo"].'</th>
                    <th scope="col-1">'.$fila ["descripcion"].'</th>
                    <th scope="col-1">$ '.$fila ["precio"].'</th>
                    <th scope="col-1">'.$fila ["cantidad"].'</th>
                </tr>';
            }

            desconectarBD($conexion);
        }

        function mostrarClientes($conexion){
        

            // 2) Preparar la orden SQL
            $consulta= "SELECT*FROM clientes";

            // puedo seleccionar de DB
            $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );

            // 3) Ejecutar la orden y obtener datos
            $datos= mysqli_query ($conexion,$consulta);

            // 4) Ir Imprimiendo las filas resultantes
            $i = 1;
            while ($fila =mysqli_fetch_array($datos)){
              //<th scope="col">'.$i++.'</th>
                echo'
                <tr>
                    
                    <th scope="col">'.$fila ["id_cliente"].'</th>
                    <th scope="col">'.$fila ["nombre"].'</th>
                    <th scope="col">'.$fila ["direccion"].'</th>
                    <th scope="col">'.$fila ["telefono"].'</th>
                </tr>';
            }

            desconectarBD($conexion);
        }

        function nuevoArticulo($conexion,$descripcion,$precio,$cantidad){
            if(strlen($descripcion) >=1 && strlen($precio) >=1 && strlen($cantidad) >=1){

                $consulta= "INSERT INTO `articulos`( `descripcion`, `precio`, `cantidad`) VALUES ('$descripcion','$precio','$cantidad')";
                
                $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
    
                
                try {
                    $datos= mysqli_query ($conexion,$consulta);
                  } catch (\Throwable $th) {
                    //throw $th;
                  }
                  
    
                  if($datos){
                   
                    echo '
                    <div class="alert alert-success text-center" role="alert">
                    Guardado exitoso!..
                    </div>';
                    
                  }else{
                    echo "no se guardo";
                  }
                
                desconectarBD($conexion);
            }else{
                echo '
                <div class="alert alert-danger text-center" role="alert">
                Debe completar todos los campos..
                </div>';
            }
        }

        function nuevoCliente($conexion,$nombre,$direccion,$telefono){
            if(strlen($nombre) >=1 && strlen($direccion) >=1 && strlen($telefono) >=1){
            
                $consulta= "INSERT INTO `clientes`(`nombre`, `direccion`, `telefono`) VALUES ('$nombre','$direccion','$telefono')";
                
                $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
    
                try {
                    $datos= mysqli_query ($conexion,$consulta);
                  } catch (\Throwable $th) {
                    //throw $th;
                  }
                  
    
                  if($datos){
                   
                    echo '
                    <div class="alert alert-success text-center" role="alert">
                    Guardado exitoso!..
                    </div>';
                    
                  }else{
                    echo "no se guardo";
                  }
                
                desconectarBD($conexion);
            }else{
                echo '
                <div class="alert alert-danger text-center" role="alert">
                Debe completar todos los campos..
                </div>';
            }
        }

        //Buscar cliente
        if(isset($_POST['action']) && $_POST['action'] == 'searchCliente'){
            if(!empty($_POST['cliente'])){
              include('bd.php');
              $id = $_POST['cliente'];
              $query = mysqli_query($conexion, "select * from clientes where id_cliente LIKE '$id'");
              desconectarBD($conexion);
              $result = mysqli_num_rows($query);
              $data = '';
              if($result > 0){
                $data = mysqli_fetch_assoc($query);
              }else{
                $data = 0;
              }
              echo json_encode($data,JSON_UNESCAPED_UNICODE);
            }
            exit;
        }
        //Buscar Articulo
        if(isset($_POST['action']) && $_POST['action'] == 'searchArticulo'){
          if(!empty($_POST['articulo'])){
            include('bd.php');
            $consulta = "SELECT * FROM `articulos` WHERE descripcion LIKE '%".$_POST['articulo']."%';";
            $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
            
            $datos= mysqli_query ($conexion,$consulta);
            
            $articulo = new stdClass();
            // 4) Ir Imprimiendo las filas resultantes
            while ($fila =mysqli_fetch_array($datos)){
              $id[] = $fila['id_articulo'];
              $descripcion [] = $fila['descripcion'];
              $precio [] = $fila['precio'];
              $cantidad [] = $fila['cantidad'];
              
              $articulo->id = $id;
              $articulo->descripcion = $descripcion;
              $articulo->precio = $precio;
              $articulo->cantidad = $cantidad;
            }
            
              
              desconectarBD($conexion);

              if($articulo){
                    $data = $articulo;
                  }else{
                    $data = 0;
                  }

                  echo json_encode($data,JSON_UNESCAPED_UNICODE);
                  
              }
            
              exit;
          }

          if(isset($_POST['idAction']) && $_POST['idAction'] == 'searchIdArticulo'){
            if(!empty($_POST['idArticulo'])){
              include('bd.php');
            $consulta = "SELECT * FROM `articulos` WHERE id_articulo=".$_POST['idArticulo']."";
            $db = mysqli_select_db( $conexion, "parcial" ) or die ( "Upps! Pues va a ser que no se ha podido conectar a la base de datos" );
            
            $datos= mysqli_query ($conexion,$consulta);
            
            $articulo = new stdClass();
            
            // 4) Ir Imprimiendo las filas resultantes
            while ($fila =mysqli_fetch_array($datos)){
              $id = $fila['id_articulo'];
              $precio = $fila['precio'];
              $cantidad = $fila['cantidad'];
              
              $articulo->id = $id;
              $articulo->precio = $precio;
              $articulo->cantidad = $cantidad;
            }
            
              
              desconectarBD($conexion);
          
              if($articulo){
                    $dataId = $articulo;
                  }else{
                    $dataId = 0;
                  }


              echo json_encode($articulo,JSON_UNESCAPED_UNICODE);
            }
            
          }
      
         
    
      
  

?>
