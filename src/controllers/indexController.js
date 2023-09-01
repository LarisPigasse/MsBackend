export const infoApi = async (req, res) => {
  try {
    res.json({ message: "Info API", version: "0.0.0.1" })
  } catch (error) {
    return res.status(500).json({ message: "error api" });
  }
}