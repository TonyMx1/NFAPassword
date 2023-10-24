class Productos{
    constructor(id, data){
        //console.log(data);
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.descripcion=data.descripcion;
        this.precio=data.precio;
    }
    set id(id){
        if(id!=null)
        id.length>0?this._id=id:this.bandera=1;
    }
    set nombre(nombre){
        nombre.length>0?this._nombre=nombre:this.bandera=1;
    }
    set descripcion(descripcion){
        descripcion.length>0?this._descripcion=descripcion:this.bandera=1;
    }
    set precio(precio){
        precio>0?this._precio=precio:this.bandera=1;
        //console.log(this._precio);
    }
    get id(){
        return this._id
    }
    get nombre(){
        return this._nombre
    }
    get descripcion(){
        return this._descripcion
    }
    get precio(){
        return this._precio
    }
    get obtenerDatos(){
        if(this._id!=null)
        return {
            id:this.id,
            nombre:this.nombre,
            descripcion:this.descripcion,
            precio:this.precio
        }
        else{
            return{
                nombre:this.nombre,
                descripcion:this.descripcion,
                precio:this.precio
            }
        }
    }
}
module.exports=Productos;