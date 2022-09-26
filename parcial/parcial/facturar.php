<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Document</title>
    <script src="functions.js"></script>
    <?php
        include('funciones.php');
    ?> 
</head>
<body>
    <section>
        <?php
            include('header.php');
        ?>
    </section>
    <div class="container-fluid col-8">
        <form>
            <div class="row mb-3">
                <div class="col-2">
                    <label for="txt_id_cliente" class="form-label">id_cliente</label>
                    <input type="text" class="form-control prueba" name="txt_id_cliente" id="txt_id_cliente" required/> 
                </div>
                <div class="col-10">
                    <label for="txt_nombre_cliente" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="txt_nombre_cliente" id="txt_nombre_cliente" disabled>
                </div>
            </div>
            <div class="row">

                <div class="col">
                    <label class="form-check-label " for="txt_telefono_cliente" >Telefono</label>
                    <input type="text" class="form-control" name="txt_telefono_cliente" id="txt_telefono_cliente" disabled>
                </div>
                <div class="col mb-2">
                    <label class="form-check-label " for="txt_direccion_cliente" >Direccion</label>
                    <input type="text" class="form-control" name="txt_direccion_cliente" id="txt_direccion_cliente" disabled>
                </div>
            </div>
        </form>
    </div>
    
    <div class="container-fluid col-12 mt-2">
        
        <table class="table table-bordered">
            <thead>
                <tr class="table-dark">
                <!-- <th scope="col">#</th> -->
                <th scope="col">id_articulo</th>
                <th scope="col">descripcion</th>
                <th scope="col">precio</th>
                <th scope="col">cantidad</th>
                <th scope="col">Existencia</th>
                <th scope="col">Precio Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="col-1" id="th_id_articulo">
                        
                    </th>
                    <th scope="col-1">
                        <input type="text" id="txt_descripcion" class="form-control col-12">
                    </th>
                    <th scope="col-1" id="th_precio" class="text-center">
                        
                    </th>
                    <th scope="col-1">
                        <input type="text" value="0" id="txt_Cantidad" class="form-control col-12" >
                    </th>
                    <th scope="col-1" id="th_existencia">
                        
                        </th>
                    <th scope="col-1" id="th_precioTotal">
                        
                        </th>
                    </tr>
                    
                    
                </tbody>
            </table>
            <button type="button" class="btn btn-primary col-12" id="btnAgregarFactura" disabled>Agregar a la factura</button>
            
            <table class="table table-bordered mt-2">
            <thead>
                <tr class="table-dark">
                <!-- <th scope="col">#</th> -->
                <th scope="col">id_articulo</th>
                <th scope="col">descripcion</th>
                <th scope="col">cantidad</th>
                <th scope="col">Precio Total</th>
                </tr>
            </thead>
                <tbody id="tbody_detalle">
                    
                </tbody>
            </table>

        <div class="container offset-9 col-3">
            <table class="table">
            <tbody>
    
            
                <tr>
                    <th scope="col-1"> 
                            Subtotal
                    </th>
                    <th scope="col-1">
                        0
                    </th>
                </tr>
                <tr>
                    <th scope="col-1"> 
                            IVA(22%)
                    </th>
                    <th scope="col-1">
                        0
                    </th>
                </tr>
                <tr>
                    <th scope="col-1"> 
                            Total
                    </th>
                    <th scope="col-1">
                        0
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
        <button type="submit" class="btn btn-success offset-4 col-4" id="btnProcesarCompra">Procesar compra</button>
        <button type="submit"class="btn btn-danger offset-4 col-4" id="btnAnularCompra">Anular compra</button>
    </div>

    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>