
var datosCargar;
var objetoCargar;
var existenciaMax = 0;
var precioTotal;
var idArticulo;
var subTotal_detalle;


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
      $('#txt_Cantidad').keyup(function(){
        
        if($('#txt_Cantidad').val() !== ''){
            existenciaMax = parseInt($('#txt_Cantidad').val());
            

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
        num = parseInt($('#txt_Cantidad').val());
        console.log(num);
        console.log(precioTotal);
        precioTotal = precioTotal * num;
        $('#th_precioTotal').html("$ "+precioTotal);
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
        <th scope="col-1" id="idArticulo_detalle">
            ${idArticulo}
        </th>
        <th scope="col-1" id="descripcion_detalle">
            ${descripcion}
        </th>
       
        <th scope="col-1" id="cantidad_detalle"> 
            ${cantidad}
        </th>
       
        <th scope="col-1" id="precioTotal_detalle">
            ${precioTotal}
            </th>
        </tr>
        `;
        $('#tbody_detalle').append(textoInsertado);
        
        limpiarCamposArt();
        
        
    }
////Al dar click al boton agregar factura.. se ejecuta el bloque de codigo..    
    $('#btnAgregarFactura').click(function(){
        event.preventDefault();
        agregarProducto();
        limpiarCamposArt();
        $( "#btnAgregarFactura" ).prop('disabled', true);


    });
//////////////////////////////////////////////////////////

});