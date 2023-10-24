var conexion=require("./conexion").conexionpr;
var Productos=require("../modelos/Productos");

async function mostrarProductos(){
    var products=[];
    try{
        var productos=await conexion.get();
        //console.log(producto);
        productos.forEach((producto) => {
            var product=new Productos(producto.id, producto.data());
            //console.log(product);
            if (product.bandera==0){
                products.push(product.obtenerDatos);
            }
        });
    }
    catch(err){
        console.log("Error al recuperar productos de la BD  ")+err;
        products=null;
    }
    return products;
}

async function nuevoProducto(datos){
    var productos=new Productos(null, datos);
    //console.log(user);
    var error=1;
    if (productos.bandera==0){
    try{
        await conexion.doc().set(productos.obtenerDatos);
        console.log("Producto insertado a la BD");
        error=0;
    }
    catch(err){
        console.log("Error al capturar el nuevo producto "+err);
        }
    }
    return error;
}

async function modificarProducto(datos){
    //console.log(datos);
    var productos=new Productos(datos.id, datos);
    //console.log(user);
    var error=1
    if (productos.bandera==0){
        try{
            //console.log(user.obtenerDatos);
            await conexion.doc(productos.id).set(productos.obtenerDatos);
            console.log("Registro actualizado ");
            error=0
        }
        catch(err){
            console.log("Error al modificar productos "+err);
        }
    }
    return error;
}

async function buscarPorIDPr(id){
    var product;
    //console.log(id);
    try{
        var producto=await conexion.doc(id).get();
        productoObjeto=new Productos(producto.id, producto.data());
        if (productoObjeto.bandera==0){
            product=productoObjeto.obtenerDatos;
        }
    }
    catch(err){
        console.log("Error al recuperar el producto "+err);
    }
    return product;
}


async function borrarProducto(id){
    try{
        await conexion.doc(id).delete();
        console.log("Registro borrado ");
    }
    catch(err){
        console.log("Error al borrar al usuario  "+err);
    }
}

module.exports={
    mostrarProductos,
    nuevoProducto,
    modificarProducto,
    buscarPorIDPr,
    borrarProducto,
}