
let datosCargar;
let objetoCargar ;
let existenciaMax = 0;

let precioTotal;
let resultadoPrecioTotal;

let idArticulo;
let subTotal_detalle;

let contadorBotonFactura = 0;
let arrayArticulos =[];

///////////////////////////////////////////////////////
$(function() {
    
    //Búsqueda de cliente
    $('#txt_id_cliente').keyup(function(){
        event.preventDefault();
    
    
        var cliente = $('#txt_id_cliente').val();
        var action = 'searchCliente';
    
    
         $.ajax({
            url: 'funciones.php',
            type: "POST",
            async: true,
            data: {action:action,cliente:cliente},
    
    
            success: function(response)
            {
               console.log(response);
               if(response == 0){
                   $('#txt_id_cliente').val('');
                   $('#txt_nombre_cliente').val('');
                   $('#txt_direccion_cliente').val('');
                   $('#txt_telefono_cliente').val('');
                   
                }else{
                   
                    var data = $.parseJSON(response);
                   $('#txt_id_cliente').val(data.id_cliente);
                   $('#txt_nombre_cliente').val(data.nombre);
                   $('#txt_direccion_cliente').val(data.direccion);
                   $('#txt_telefono_cliente').val(data.telefono);
                   
               }
            },
            error: function(error){
                console.log(response);
            }
        }); 
    }); 

    //Autocompletar
    

    //Búsqueda de producto

    $('#txt_descripcion').keyup(function(){
        event.preventDefault();
    
    
        var art = $('#txt_descripcion').val();
        var articulo = art.trim();
        var action = 'searchArticulo';
    
    
         $.ajax({
            url: 'funciones.php',
            type: "POST",
            async: true,
            data: {action:action,articulo:articulo},
    
    
            success: function(response){
                
               
               if(response == 0){
                  console.log(response);
                  
                }else{ 
                    var data = $.parseJSON(response);
                    datosCargar = data;
                   

                    $( "#txt_descripcion" ).autocomplete({
                        source: data.descripcion
                    });

                }
            },
            error: function(error){
               
            }
        }); 
    }); 
    
    $('#txt_descripcion').change(function(){
        if($('#txt_descripcion').val() !== ''){
            
            let idaction = 'searchIdArticulo';
            let idarticulo = datosCargar.id[0];
            
            tomarIdArticulo(idaction,idarticulo)
            
        }else if($('#txt_descripcion').val() == ""){
            
            limpiarCamposArt();
        }
    });
        
////El JSON que viene desde php , lo decodifica y obtengo los datos del artículo
function tomarIdArticulo(idaction,idarticulo) {
              
        
                
    $.ajax({
        url: 'funciones.php',
        type: "POST",
        async: true,
        data: {idAction:idaction,idArticulo:idarticulo},
        
        
        success: function(response){
            
            
            if(response == 0){
                
            }
            objetoCargar = $.parseJSON(response);
            
            console.log("este es el json"+response);
            
            $('#th_id_articulo').html(objetoCargar.id);
            $('#th_precio').html(objetoCargar.precio);
            idArticulo = objetoCargar.id;
            existenciaMax = objetoCargar.cantidad;
            precioTotal = objetoCargar.precio;
            
            $('#th_existencia').html(objetoCargar.cantidad); 

        },
        error: function(error){

        }
    });
}
///////////////////////////////////////////////////////
//////Función que se ejecuta cada vez que suelto una tecla en el elemento con ese ID
      $('#txt_Cantidad').change(function(){
        
        if($('#txt_Cantidad').val() !== ''){
            existenciaMax = $('#txt_Cantidad').val();
            

    if ( existenciaMax <= parseInt(objetoCargar.cantidad) && existenciaMax >=1 && $('#txt_Cantidad').val() !==''){
        calcularPrecioTotal();
        $( "#btnAgregarFactura" ).prop('disabled', false);  //quito la propiedad "disabled" al elemento con ese ID
    }else if(existenciaMax > parseInt(objetoCargar.cantidad) || existenciaMax <= 0){
        calcularPrecioTotal();
            $( "#btnAgregarFactura" ).prop('disabled', true);   //agrego la propiedad "disabled" al elemento con ese ID
    }
    
    }else{
        
        $( "#btnAgregarFactura" ).prop('disabled', true);   //agrego la propiedad "disabled" al elemento con ese ID
    }
    }); 
///////////////////////////////////////////////////////
////Función que limpia los campos de los articulos
    function limpiarCamposArt(){
        $('#th_id_articulo').html('');
        $('#txt_descripcion').val('');
        $('#th_precio').html('');
        $('#txt_Cantidad').val('');
        $('#th_existencia').html('');
        $('#th_precioTotal').html('');
    }
///////////////////////////////////////////////////////
////Calcular precioTotal
    function calcularPrecioTotal(){
        let num = $('#txt_Cantidad').val();
        console.log("numero de input cantidad: "+num);
        console.log("numero del precio total recibido : "+precioTotal);
        resultadoPrecioTotal = parseInt(precioTotal) * parseInt(num);
        console.log("resultado va a ser igual = "+resultadoPrecioTotal);
        $('#th_precioTotal').html("$ "+resultadoPrecioTotal);
    }
    ///////////////////////////////////////////////////////
////Agregar producto al detalle    
    function agregarProducto(){
        //let idArticulo = $('#th_id_articulo').val();
        let descripcion = $('#txt_descripcion').val();
        let cantidad = $('#txt_Cantidad').val();
        //let precioTotal = $('#th_precioTotal').val();
        
        console.log("Este es el id"+idArticulo);
        textoInsertado = `
        <tr>
        <th scope="col-1" id="${contadorBotonFactura}idArticulo_detalle">
            ${idArticulo} 
        </th>
        <th scope="col-1" id="${contadorBotonFactura}descripcion_detalle">
            ${descripcion}
        </th>
       
        <th scope="col-1" id="${contadorBotonFactura}cantidad_detalle"> 
            ${cantidad}
        </th>
       
        <th scope="col-1" id="${contadorBotonFactura}precioTotal_detalle">
            ${resultadoPrecioTotal}
            </th>
        </tr>
        `;
        $('#tbody_detalle').append(textoInsertado);
        
        limpiarCamposArt();
        
        
    }
////Al dar click al boton agregar factura.. se ejecuta el bloque de codigo..    
    $('#btnAgregarFactura').click(function(){
        contadorBotonFactura+=1;
        console.log("Articulos en factura : "+contadorBotonFactura);
        event.preventDefault();
        agregarProducto();
        limpiarCamposArt();
        $( "#btnAgregarFactura" ).prop('disabled', true);


    });
    //////////////////////////////////////////////////////////
    $('#btnProcesarCompra').click(function(){
         event.preventDefault();
        
         
         
         for (var i = 1; i <= contadorBotonFactura; i+=1) {
            let renglonArticulo = '#'+i+'idArticulo_detalle';
            console.log(renglonArticulo);
            let renglonDescripcion = '#'+i+'descripcion_detalle';
            let renglonCantidad = '#'+i+'cantidad_detalle';
            let renglonPrecio = '#'+i+'precioTotal_detalle';
           
             articulo = new Object();
             articulo.nroRenglon = i;
             articulo.id_articulo = $(renglonArticulo).val();
             articulo.nombre = $(renglonDescripcion).val();
             articulo.cantidad = $(renglonCantidad).val();
             articulo.precioTotal = $(renglonPrecio).val();
             arrayArticulos.push(articulo);
            
         }
        
        
        console.log(arrayArticulos); 
        

        
       /*  var art = $('#txt_descripcion').val();
        var articulo = art.trim();
        var action = 'searchArticulo';

        $.ajax({
            url: 'funciones.php',
            type: "POST",
            async: true,
            data: {idAction:idaction,idArticulo:idarticulo},
            
            
            success: function(response){
                
                
                if(response == 0){
                    
                }
                objetoCargar = $.parseJSON(response);
                
                console.log("este es el json"+response);
                
                $('#th_id_articulo').html(objetoCargar.id);
                $('#th_precio').html(objetoCargar.precio);
                idArticulo = objetoCargar.id;
                existenciaMax = objetoCargar.cantidad;
                precioTotal = objetoCargar.precio;
                
                $('#th_existencia').html(objetoCargar.cantidad); 

            },
            error: function(error){
    
            }
        });  */
    });
    
});