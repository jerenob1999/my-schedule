export async function GET() {
  const res = await fetch(
    "https://my-json-server.typicode.com/juanpernu/bilog-fe-challenge/schedule",
    {
      headers: {
        "Content-Type": "application/json",
        method: "GET",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
