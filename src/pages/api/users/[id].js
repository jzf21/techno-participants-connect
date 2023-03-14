import SupabaseClient from "../../../utils/SupabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const user = await SupabaseClient.from("users")
      .select()
      .eq("techno_id", id)
      .then((data) => {
        return data.data[0];
      });
    res.status(200).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
