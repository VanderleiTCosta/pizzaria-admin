import mongoose from 'mongoose';

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  image: { type: String, required: true },
  portfolio_images: [{ type: String }],
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  }
});

const professionalModel = mongoose.models.professional || mongoose.model('professional', professionalSchema);

export default professionalModel;