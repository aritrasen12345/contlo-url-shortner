//Import Models
import User from "../../models/User.js";
import Shorturl from "../../models/Shorturl.js";

const deleteURLController = async (req, res, next) => {
  try {
    const { shorturl } = req.body;
    const userId = req.userId;

    // Search the shorturl in DB
    const foundShortURL = await Shorturl.findOne({ url: shorturl });

    //If not found in DB throw ERROR
    if (!foundShortURL) {
      return res.status(404).json({
        status: false,
        message: "SHORTURL NOT FOUND!",
        data: [],
      });
    }

    // DELETE the shortURL
    const deleteShortURL = await Shorturl.deleteOne({ url: shorturl });

    if (deleteShortURL.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "DELETE OPERATION FAILED!",
        data: [],
      });
    }

    // Also Delete the Url from User's url Array
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { urls: foundShortURL._id },
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "SHORTURL DELETED SUCCESSFULLY!",
      data: deleteShortURL,
    });
  } catch (err) {
    next(err);
  }
};

export default deleteURLController;
