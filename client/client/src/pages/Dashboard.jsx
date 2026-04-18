function Dashboard({ books }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>📊 Dashboard</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div style={box}>Total<br />{books.length}</div>
        <div style={box}>Available<br />{books.filter(b => b.available).length}</div>
        <div style={box}>Issued<br />{books.filter(b => !b.available).length}</div>
      </div>
    </div>
  );
}

const box = {
  background: "#2a5298",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "120px"
};

export default Dashboard;