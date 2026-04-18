function IssuedBooks({ books }) {
  const issued = books.filter(b => !b.available);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📕 Issued Books</h2>

      {issued.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default IssuedBooks;