import express from 'express';
import Television from './models/liste_télévisions.js';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", async function (req, res) {
  const wishlist = await Television.loadMany({achetées : 0});
  const Panier = await Television.loadMany({achetées :  1 })
  res.render('VotreFichierEJS.ejs', {wishlist , Panier });
});

app.post("/add", async function (req, res) {
  const télé = new Television();
  télé.update({Marque : req.body.new_marque, Prix : req.body.new_prix, Taille : req.body.new_taille, achetées : 0, Fonctionnel :"oui" })
  await télé.save();
  res.redirect('/');
});

app.get("/buy/:idTelevision", async function (req, res) {  
  const télé =await Television.load({ idTelevision: req.params.idTelevision});
  télé.achetées = 1;
  télé.save();
  res.redirect('/');
});

app.post("/Fonctionnel/:idTelevision", async function (req, res) {  
  const télé =await Television.load({ idTelevision: req.params.idTelevision});
  télé.update({Fonctionnel : req.body.new_fonctionnel, Cause_destruction : req.body.new_cause})
  
  await télé.save();
  res.redirect('/');
});

app.get("/delete/:idTelevision", async function (req, res) {  
  await Television.delete({ idTelevision: req.params.idTelevision});
  res.redirect('/');
});

app.listen(4000);
