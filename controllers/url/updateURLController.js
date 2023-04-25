//Import Models
import Shorturl from "../../models/Shorturl.js";

const updateURLController = async (req, res, next) => {
  try {
    const { originalUrl, updatedOriginalUrl } = req.body;

    const foundLongURL = await Shorturl.findOne({ originalUrl });

    // If LongURL not found in DB throw Error
    if (!foundLongURL) {
      return res.status(404).json({
        status: false,
        message: "ORIGINALURL NOT FOUND!",
        data: [],
      });
    }

    const updateLongURL = await Shorturl.findOneAndUpdate(
      { originalUrl },
      { originalUrl: updatedOriginalUrl },
      { new: true }
    );

    if (!updateLongURL) {
      return res.status(404).json({
        status: false,
        message: "UPDATE OPERATION FAILED!",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "UPDATED LONGURL SUCCESSFULLY!!",
      data: updateLongURL,
    });
  } catch (err) {
    next(err);
  }
};

export default updateURLController;
