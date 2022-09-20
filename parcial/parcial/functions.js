
var datosCargar;
var objetoCargar;
var existenciaMax = 0;

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
                    console.log(data);

                    $( "#txt_descripcion" ).autocomplete({
                        source: data.descripcion
                        
                    });
                    
                    
                    
                }
            },
            error: function(error){
                console.log(response);
            }
        }); 
    }); 
    
    $('#txt_descripcion').change(function(){
        if($('#txt_descripcion').val() !== ''){
            console.log("cambió");
            
            let idaction = 'searchIdArticulo';
            let idarticulo = datosCargar.id[0];
            tomarIdArticulo(idaction,idarticulo)
            
            console.log(datosCargar.id[0]);
        }else if($('#txt_descripcion').val() == ""){
            console.log('vacío');
            limpiarCamposArt();
        }
    });
        
        
    function tomarIdArticulo(idaction,idarticulo) {
              
        limpiarCamposArt();
                
        $.ajax({
            url: 'funciones.php',
            type: "POST",
            async: true,
            data: {idAction:idaction,idArticulo:idarticulo},
            
            
            success: function(response){
                
                
                if(response == 0){
                    
                }
                objetoCargar = $.parseJSON(response);
                
                
                $('#th_id_articulo').append(objetoCargar.id);
                $('#th_precio').append(objetoCargar.precio);
                existenciaMax = objetoCargar.cantidad;
                console.log(existenciaMax);
                console.log( $('#txt_Cantidad').val());
                $('#th_existencia').append(objetoCargar.cantidad); 
    
                
    
                
               
            },
            error: function(error){
    
            }
        });
    }
      /////////////////////////////////////////
      $('#txt_Cantidad').keyup(function(){
        
        if($('#txt_Cantidad').val() !== ''){
            existenciaMax = parseInt($('#txt_Cantidad').val());
            console.log("la cantidad es"+existenciaMax);
            console.log("la existencia es"+objetoCargar.cantidad);

    if ( existenciaMax <= parseInt(objetoCargar.cantidad) && existenciaMax >=1 && $('#txt_Cantidad').val() !==''){
        $( "#btnAgregarFactura" ).prop('disabled', false);
    }else if(existenciaMax > parseInt(objetoCargar.cantidad) || existenciaMax <= 0){
            $( "#btnAgregarFactura" ).prop('disabled', true);
    }
    
    }else{
        $( "#btnAgregarFactura" ).prop('disabled', true);
    }
    }); 

       /////////////////////////////////////////
    function limpiarCamposArt(){
        $('#th_id_articulo').replaceWith('<th scope="col-1" id="th_id_articulo"></th>');
        $('#th_precio').replaceWith('<th scope="col-1" id="th_precio"></th>')
        //$('#txt_Cantidad').replaceWith('<input type="number" value="0" id="txt_Cantidad" />')
        $('#th_existencia').replaceWith('<th scope="col-1" id="th_existencia"></th>')
        $('#th_precioTotal').replaceWith('<th scope="col-1" id="th_precioTotal"></th>')
    }
});



