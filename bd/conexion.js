var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var micuenta=admin.firestore();
var conexion=micuenta.collection("miejemplo");
var conexionpr=micuenta.collection("Productos");

module.exports={
    conexion,
    conexionpr
};