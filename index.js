import prisma from "./lib/prisma.js"; // path sesuai

async function testConn() {
  const users = await prisma.user.findMany();
  return users;
}

testConn()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
