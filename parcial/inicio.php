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
    <form action="facturar.php">
        <button type="submit" class="btn btn-success offset-4 col-4 mt-2 mb-2">Facturacion</button>
    </form>
    <form action="articulos.php">
        <button type="submit" class="btn btn-success offset-4 col-4 mb-2">Articulos</button>
    </form>
    <form action="clientes.php">
        <button type="submit" class="btn btn-success offset-4 col-4">Clientes</button>
    </form>
    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>