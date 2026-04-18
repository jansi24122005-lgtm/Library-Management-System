<div style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
}}>
  {books.map(book => (
    <div key={book._id} style={{
      width: "250px",
      margin: "15px",
      padding: "15px",
      borderRadius: "15px",
      background: "#fff",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      textAlign: "center"
    }}>
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      <p style={{
        color: book.available ? "green" : "red",
        fontWeight: "bold"
      }}>
        {book.available ? "Available" : "Issued"}
      </p>

      <button onClick={() => issueBook(book._id)}>Issue</button>
      <button onClick={() => returnBook(book._id)}>Return</button>
    </div>
  ))}
</div>