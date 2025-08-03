const express = require('express');
const cors = require('cors');
const doctors = require('./data/doctors.json');
const app = express();
app.use(cors());

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const d = doctors.find(doc => doc.doctor_id === parseInt(req.params.id));
  if (d) res.json(d);
  else res.status(404).json({ error: 'Doctor not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
