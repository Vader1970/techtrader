// **Coded by Daniel Wilkey** //
// Simple test API route

export default function handler(req, res) {
  res.status(200).json({ message: "API is working!" });
}
