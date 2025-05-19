export default function CopyrightCard({ item }: { item: { id: number; title: string; creator: string; hash: string; status: string } }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: 15,
        borderRadius: 6,
        marginBottom: 15,
      }}
    >
      <h3>{item.title}</h3>
      <p><b>Creator:</b> {item.creator}</p>
      <p><b>Hash:</b> {item.hash.slice(0, 10)}...</p>
      <p><b>Status:</b> {item.status}</p>
    </div>
  );
}
