function AvailableBooks({ books }) {
  const available = books.filter(b => b.available);

  return (
    <div style={{ textAlign: "center" }}>
      <h2> Available Books</h2>

      {available.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default AvailableBooks;