import mongoose from "mongoose";

export interface IPlanet {
  name: string;
  color: string;
  description: string;
}

const PlanetSchema = new mongoose.Schema<IPlanet>({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string): boolean {
        return /^#[0-9A-Fa-f]{6}$/.test(value);
      },
      message: 'Invalid color format. Color should be in the format #11AAff.'
    }
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model('Planet', PlanetSchema);
