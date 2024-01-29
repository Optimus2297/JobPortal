// Get all Jobs => /api/v1/jobs
exports.getJobs = (req, res, next) => {
  res.setHeader("content-type", "application/json");
  res.status(200).json({
    success: true,
    message: "This route will display all jobs in future.",
  });
};
