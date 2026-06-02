const Gallery = require('../models/Gallery');
const cloudinary = require('cloudinary').v2;

// Get All Gallery
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .populate('match', 'matchNumber status')
      .populate('tournament', 'name')
      .populate('team', 'name logo')
      .populate('uploadedBy', 'firstName lastName profileImage')
      .sort({ uploadDate: -1 });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Gallery By ID
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
      .populate('uploadedBy', 'firstName lastName email profileImage')
      .populate('match', 'matchNumber status')
      .populate('tournament', 'name')
      .populate('team', 'name logo')
      .populate('comments.user', 'firstName lastName profileImage');

    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload Media
exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, mediaType, match, tournament, team } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary (optional - you can use local storage too)
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: mediaType === 'video' ? 'video' : 'image',
      folder: 'cricket-tournament'
    });

    const gallery = await Gallery.create({
      title,
      description,
      mediaType,
      mediaUrl: result.secure_url,
      thumbnail: mediaType === 'video' ? result.thumbnail_url : result.secure_url,
      match,
      tournament,
      team,
      uploadedBy: req.user.id
    });

    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Gallery
exports.updateGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Media
exports.deleteMedia = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Match Gallery
exports.getMatchGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ match: req.params.matchId })
      .populate('uploadedBy', 'firstName lastName profileImage')
      .sort({ uploadDate: -1 });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Tournament Gallery
exports.getTournamentGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ tournament: req.params.tournamentId })
      .populate('uploadedBy', 'firstName lastName profileImage')
      .sort({ uploadDate: -1 });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Team Gallery
exports.getTeamGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ team: req.params.teamId })
      .populate('uploadedBy', 'firstName lastName profileImage')
      .sort({ uploadDate: -1 });

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like Media
exports.likeMedia = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likedBy: req.user.id }, $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user: req.user.id, text } } },
      { new: true }
    ).populate('comments.user', 'firstName lastName profileImage');

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
