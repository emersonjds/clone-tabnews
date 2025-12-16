function status(req, res) {
  res.status(200).json({ valor: "Status ok" });
}

export default status;