import Feature from "../models/Feature.js";

// 1. Get Live Stats & Recent Features
export const getDashboardStats = async (req, res) => {
  try {
    const totalFeatures = await Feature.countDocuments();
    
    // Total votes calculate karne ke liye MongoDB aggregation
    const voteAggregation = await Feature.aggregate([
      { $group: { _id: null, totalVotes: { $sum: "$votes" } } }
    ]);
    const totalVotes = voteAggregation.length > 0 ? voteAggregation[0].totalVotes : 0;

    // Status ke hisaab se count
    const underReview = await Feature.countDocuments({ status: "Under Review" });
    const planned = await Feature.countDocuments({ status: "Planned" });
    const inProgress = await Feature.countDocuments({ status: "In Progress" });
    const completed = await Feature.countDocuments({ status: "Completed" });

    // Latest 5 features table ke liye
    const recentFeatures = await Feature.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      stats: { totalFeatures, totalVotes, underReview, planned, inProgress, completed },
      recentFeatures
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 2. Update Feature Status (Admin Action)
export const updateFeatureStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updatedFeature = await Feature.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    res.json({ success: true, message: "Status updated successfully", feature: updatedFeature });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 3. Delete Feature (Admin Action)
export const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;
    await Feature.findByIdAndDelete(id);
    res.json({ success: true, message: "Feature deleted permanently" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};