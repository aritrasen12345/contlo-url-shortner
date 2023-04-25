// Import nanoid
import generateUniqueId from "../../utils/nanoid.js";

//Import Models
import User from "../../models/User.js";
import Shorturl from "../../models/Shorturl.js";

const generateURLController = async (req, res, next) => {
  try {
    const { url, slug } = req.body;
    const userId = req.userId;

    // Check if url already exists in db
    const foundURL = await Shorturl.findOne({ originalUrl: url });
    if (foundURL) {
      return res.status(201).json({
        status: true,
        message: "SHORTURL FETCHED!",
        data: { shortUrl: foundURL.url },
      });
    }

    let uniqueId;
    if (slug) {
      // If a slug is provided use it
      uniqueId = slug;
    } else {
      // Else Generate a 6 digit nanoid
      uniqueId = generateUniqueId();
    }

    const newShortURL = new Shorturl({
      url: `https://shorturl.in/${uniqueId}`,
      originalUrl: url,
    });

    // Store that into DB
    await newShortURL.save();

    // Also Store the Url into User's url Array
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { urls: newShortURL._id },
      },
      { new: true }
    );

    // If everything works fine then return URL Generated Successfully
    return res.status(200).json({
      status: true,
      message: "URL GENERATED SUCCESSFULLY!",
      data: newShortURL,
    });
  } catch (err) {
    next(err);
  }
};

export default generateURLController;
