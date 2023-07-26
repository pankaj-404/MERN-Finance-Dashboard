import KPI from "../models/KPI.js";

export const kpis = async (req, res) => {
  try {
    const kpis = await KPI.find();
    console.log("kpis BE===>", kpis);
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
