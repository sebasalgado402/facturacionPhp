
<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        include('funciones.php');
    ?>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    <section>
        <?php
        include('header.php');
        ?>
    </section>
    <div class="container-fluid form-control">
        <form action="articulos.php" method="post" class="offset-2 col-9">
            <label for="descripcion" class="form-label" >Descripcion:</label>
            <input type="text" class="form-control" name="descripcion" id="">
            <label for="precio" class="form-label">Precio:</label>
            <input type="number" class="form-control" name="precio" id="">
            <label for="cantidad">Cantidad:</label>
            <input type="number" class="form-control" class="form-label" name="cantidad" id="">
            <button type="submit" class="btn btn-outline-danger mt-2">Ingresar articulo nuevo</button>
        </form>
    </div>
    <?php 
        if(isset($_POST['descripcion']) || isset($_POST['precio']) || isset($_POST['cantidad'])){
            include('bd.php');
            if($conexion){
                nuevoArticulo($conexion,$_POST['descripcion'],$_POST['precio'],$_POST['cantidad']);
            }
        }

    ?>

    <div class="container-fluid col-8">
        <table class="table table-striped table-bordered table-danger">
        <thead>
            <tr class="table-dark">
            <th scope="col-1">#</th>
            <th scope="col-1">Cod_Articulo</th>
            <th scope="col-1">Descripcion</th>
            <th scope="col-1">Precio</th>
            <th scope="col-1">Cantidad</th>
            </tr>
        </thead>
        <tbody>
            <?php
            include('bd.php');
            if($conexion){
                mostrarArticulos($conexion);
            }

            ?>
        </tbody>
        </table>
    </div>
    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>