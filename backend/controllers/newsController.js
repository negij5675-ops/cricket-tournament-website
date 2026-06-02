const News = require('../models/News');
const { io } = require('../server');

// Get All News
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true })
      .populate('author', 'firstName lastName email')
      .populate('relatedTournament', 'name')
      .populate('relatedTeam', 'name')
      .populate('relatedPlayer', 'userId')
      .sort({ publishedAt: -1 });

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get News By ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'firstName lastName email profileImage')
      .populate('relatedTournament', 'name')
      .populate('relatedTeam', 'name logo')
      .populate('relatedPlayer', 'userId jerseyNumber');

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create News
exports.createNews = async (req, res) => {
  try {
    const { title, content, category, featuredImage, relatedTournament, relatedTeam, relatedPlayer } = req.body;

    const news = await News.create({
      title,
      content,
      category,
      featuredImage,
      relatedTournament,
      relatedTeam,
      relatedPlayer,
      author: req.user.id,
      isPublished: false
    });

    res.status(201).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update News
exports.updateNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Publish News
exports.publishNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { isPublished: true, publishedAt: Date.now() },
      { new: true }
    );

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    // Emit real-time notification
    io.emit('news-published', news);

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete News
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    res.status(200).json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get News By Category
exports.getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category, isPublished: true })
      .populate('author', 'firstName lastName')
      .sort({ publishedAt: -1 });

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Increment News View
exports.incrementNewsView = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
