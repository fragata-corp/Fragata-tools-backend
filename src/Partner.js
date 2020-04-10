const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  fone: String,
  tag: String,
  address: {
    street: String,
    number: String,
  },
});

module.exports = mongoose.model("Partner", PartnerSchema);
