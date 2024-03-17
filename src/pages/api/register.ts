import {} from "@astrojs/db";
import bcrypt from "bcrypt";

export async function POST({ request }) {
  const body = await request.json();

  if (!body.username || !body.password || !body.email) {
    return new Response("Missing required fields", { status: 400 });
  }

  const existingUser = await astroDb.users.findOne({ email: body.email });

  if (existingUser) {
    return new Response("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const newUser = await astroDb.users.insertOne({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify(newUser), { status: 201 });
}
