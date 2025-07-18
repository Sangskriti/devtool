const JsonRecord = require('../models/JsonRecord');

exports.formatJson = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Input JSON is required' });
    }

    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);

    const saved = await JsonRecord.create({ input, formatted });

    res.json({ formatted, saved });
  } catch (error) {
    console.error("Error parsing JSON or saving:", error.message);
    res.status(400).json({ error: 'Invalid JSON format' });
  }
};


exports.getAllJsonRecords = async (req, res) => {
  try {
    const records = await JsonRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

exports.encodeBase64 = (req, res) => {
  try {
    const encoded = Buffer.from(req.body.input).toString('base64');
    res.json({ result: encoded });
  } catch (e) {
    res.status(400).json({ error: 'Encoding failed' });
  }
};

exports.decodeBase64 = (req, res) => {
  try {
    const decoded = Buffer.from(req.body.input, 'base64').toString('utf8');
    res.json({ result: decoded });
  } catch (e) {
    res.status(400).json({ error: 'Decoding failed' });
  }
};
