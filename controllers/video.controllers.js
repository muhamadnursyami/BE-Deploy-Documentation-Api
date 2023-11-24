const Video = require("../models/video");
module.exports = {
  getAllVideo: async (req, res) => {
    try {
      const video = await Video.find();
      res.json({
        data: video,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  getVideoById: async (req, res) => {
    try {
      const { id } = req.params;

      const videoById = await Video.findById(id);

      res.json({
        data: videoById,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  deleteVideoById: async (req, res) => {
    try {
      const { id } = req.params;

      await Video.findByIdAndDelete(id);
      res.json({
        message: "data video berhasil dihapus berdasarkan id",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteAllVideo: async (req, res) => {
    try {
      await Video.deleteMany({});
      res.json({
        message: "semua data video berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
