{
  const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Data dummy untuk simulasi database
let orders = [
  { id: 1, product: 'Keripik tempe goreng', quantity: 5 },
  { id: 2, product: 'basreng pedas', quantity: 10 },
];

// Mendapatkan semua pesanan
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Mendapatkan pesanan berdasarkan ID
app.get('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Membuat pesanan baru
app.post('/orders', (req, res) => {
  const { product, quantity } = req.body;
  const id = orders.length + 1;
  const order = { id, product, quantity };
  orders.push(order);
  res.json(order);
});

// Mengupdate pesanan berdasarkan ID
app.put('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { product, quantity } = req.body;
  const order = orders.find(o => o.id === id);
  if (order) {
    order.product = product;
    order.quantity = quantity;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Menghapus pesanan berdasarkan ID
app.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    const deletedOrder = orders.splice(index, 1)[0];
    res.json(deletedOrder);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Menjalankan server pada port 80
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

}
