import SupabaseClient from "../../../utils/SupabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await SupabaseClient.from("users")
      .select()
      .then((data) => {
        return data.data;
      });
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
