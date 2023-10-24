var ruta=require("express").Router();
var fs=require("fs");
var subirArchivo=require("../middlewares/subirArchivo")
var {autorizado, admin}=require("../middlewares/funcionesPassword")
var {mostrarUsuarios, nuevoUsuario, buscarPorID, modificarUsuario, borrarUsuario, buscarPorUsuario, verificarPassword}=require("../bd/usuariosBD");

ruta.get("/usuarios", autorizado, async (req,res) =>{
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar", {usuarios});
})

ruta.get("/", async (req,res)=>{
    res.render("usuarios/login");
});

ruta.get("/mostrarUsuarios",autorizado, async(req,res)=>{
        res.render("usuarios/mostrar",{usuarios});
});

ruta.get("/nuevousuario",async(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario",subirArchivo(), async(req,res)=>{
    //console.log(req.file);
    req.body.foto=req.file.originalname;
    //console.log(req.body);
    var error = await nuevoUsuario(req.body);
    res.redirect("/");
    //res.end();
});

ruta.get("/editar/:id",async(req,res)=>{
    var user = await buscarPorID(req.params.id);
    //console.log(user);
    res.render("usuarios/modificar",{user});
});

ruta.post("/editar", subirArchivo(), async(req,res) => {
    try {
        const usuarioAct = await buscarPorID(req.body.id);
        if (req.file) {
            req.body.foto = req.file.originalname;

            if (usuarioAct.foto) {
                const rutaFotoAnterior = `web/images/${usuarioAct.foto}`;
                fs.unlinkSync(rutaFotoAnterior);
            }
            else{
                req.body.foto = req.body.fotoVieja;
            }
        }
        await modificarUsuario(req.body);
        res.redirect("/usuarios");
    } catch (error) {
        console.log("Error al editar pr: ", error);
        res.status(500).send("Error interno del servidor");
    }
});

ruta.get("/borrar/:id", async(req,res)=>{
    var usuario = await buscarPorID(req.params.id)
    if(usuario){
        var foto = usuario.foto;
        fs.unlinkSync(`web/images/${foto}`);
        await borrarUsuario(req.params.id);
    }
    res.redirect("/usuarios");
});


ruta.post("/login", async (req, res) => {
    var { usuario, password } = req.body;
    var  usuarioEncontrado = await buscarPorUsuario(usuario);
    if (usuarioEncontrado) {
      var passwordCorrect = await verificarPassword(password, usuarioEncontrado.password, usuarioEncontrado.salt);
      if (passwordCorrect) {
        if(usuarioEncontrado.admin){
          //console.log("admin");
          req.session.admin=usuarioEncontrado,admin;
          res.redirect("/productos/nuevoPro");
        } else {
          req.session.usuario = usuarioEncontrado.usuario;
          res.redirect("/usuarios");
        }
      } else {
        console.log("Usuario o contraseña incorrectos");
        res.render("usuarios/login");
      }
    } else {
        console.log("Usuario o contraseña incorrectos");
        res.render("usuarios/login");
    }
  });

ruta.get("/logout", (req,res)=>{
    req.session=null;
    res.redirect("/")
})


module.exports=ruta;