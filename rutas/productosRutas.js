var rutaPr = require("express").Router();
var {autorizado, admin}=require("../middlewares/funcionesPassword")
var subirArchivo = require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarPorIDPr, borrarProducto } = require("../bd/productosBD");
const { id } = require("../bd/usuariosBD");

rutaPr.get("/mostrarProd", async (req, res) => {
    var products = await mostrarProductos();
    //console.log(products);
    //res.end();
    res.render("productos/mostrarPro", { products });
})

rutaPr.get("/nuevoProducto", async (req, res) => {
    res.render("productos/nuevoPro");
});

rutaPr.post("/nuevoProducto", async (req, res) => {
    var error = await nuevoProducto(req.body);
    res.redirect("/pro/mostrarProd")
});

rutaPr.get("/editarPr/:id", async (req, res) => {
    var producto = await buscarPorIDPr(req.params.id);
    res.render("productos/modificarPro", { producto });
});

rutaPr.post("/editarPr", async (req, res) => {
    var error = await modificarProducto(req.body);
    res.redirect("/productos/mostrarPro");
    res.end();
});

rutaPr.get("/borrarPr/:id", async(req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/pro/mostrarProd");
})

module.exports = rutaPr;