export const getAllComplaints = async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.json(complaints);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  export const updateComplaintStatus = async (req, res) => {
    try {
      const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(complaint);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  