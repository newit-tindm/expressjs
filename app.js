const express = require('express');

const mongoose = require('mongoose');

const Item = require('./models/items');

const app = express();

app.use(express.urlencoded({ extended: true }));

const mongodb = 'mongodb+srv://tindm:minhtin123@cluster0.uetaa.mongodb.net/node_db?retryWrites=true&w=majority';

mongoose.connect(mongodb).then(() => console.log('Connected')).catch(err => console.log(err));

app.listen(3000);

app.set('view engine', 'ejs');

// app.get('/create-item', (req, res) => {
//     const item = new Item({
//         name: 'computer',
//         price: 2000
//     });

//     item.save().then(data => res.send(data)).catch((err, result) => {
//         if (err) throw err;
//     });
// });

// app.get('/get-items', (req, res) => {
//     Item.find().then(data => res.send(data)).catch((err, result) => {
//         if (err) throw err;
//     });
// });

// app.get('/get-item', (req, res) => {
//     Item.findById('60f3fc2ee454fb21c01e6e70').then(data => res.send(data)).catch((err, result) => {
//         if (err) throw err;
//     });
// });


app.get('/', (req, res) => {
     res.redirect('/get-items');
});

app.get('/get-items', (req, res) => {
    Item.find().then(data => {
        res.render('index', { items: data })
    }).catch(err => console.log(err));
});

app.get('/add-item' , (req , res)=>{
    res.render('add-item')
})

app.post('/items' , (req , res)=>{
    const item = Item(req.body);
    item.save().then(() => {
         res.redirect('/');
    }).catch(err => console.log(err))
})

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        res.render('item-detail', { item: result });
    })
});

app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
         res.json({ redirect_link: '/' });
    })
});

app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
         res.json({ msg: 'Item updated successfully.' })
    })
});

app.use((req, res) => {
    res.render('error')
});
