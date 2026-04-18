import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Dashboard from "./pages/Dashboard";
import IssuedBooks from "./pages/IssuedBooks";
import AvailableBooks from "./pages/AvailableBooks";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // fetch
  const getBooks = () => {
    axios.get("http://localhost:5000/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getBooks();
  }, []);

  // login
  const handleLogin = () => {
    if (username.trim() === "admin" && password.trim() === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // add / update
  const addBook = () => {
    if (!title || !author) return alert("Fill all fields");

    axios.post("http://localhost:5000/addBook", { title, author })
      .then(() => {
        getBooks();
        setTitle("");
        setAuthor("");
      });
  };

  const updateBook = () => {
    axios.put(`http://localhost:5000/update/${editId}`, { title, author })
      .then(() => {
        getBooks();
        setTitle("");
        setAuthor("");
        setEditId(null);
      });
  };

  // actions
  const issueBook = (id) => axios.put(`http://localhost:5000/issue/${id}`).then(getBooks);
  const returnBook = (id) => axios.put(`http://localhost:5000/return/${id}`).then(getBooks);
  const deleteBook = (id) => axios.delete(`http://localhost:5000/delete/${id}`).then(getBooks);

  const editBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditId(book._id);
  };

  // 🔐 LOGIN UI
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>🔐 Login</h2>

        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} style={{ padding: "8px", margin: "5px" }} /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ padding: "8px", margin: "5px" }} /><br />

        <button onClick={handleLogin} style={{ padding: "8px", background: "green", color: "white" }}>
          Login
        </button>
      </div>
    );
  }

  // 🏠 HOME
  const Home = () => (
    <div style={{ textAlign: "center" }}>
      <h2>📚 Library Management</h2>

      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />

      {editId ? (
        <button onClick={updateBook} style={blueBtn}>Update</button>
      ) : (
        <button onClick={addBook} style={greenBtn}>Add</button>
      )}

      <br /><br />

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {books
          .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
          .map(book => (
            <div key={book._id} style={cardStyle}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>

              <p style={{
                color: book.available ? "green" : "red",
                fontWeight: "bold"
              }}>
                {book.available ? "Available" : "Issued"}
              </p>

              {book.available ? (
                <button onClick={() => issueBook(book._id)} style={orangeBtn}>Issue</button>
              ) : (
                <button onClick={() => returnBook(book._id)} style={blueBtn}>Return</button>
              )}

              <br />

              <button onClick={() => editBook(book)} style={purpleBtn}>Edit</button>
              <button onClick={() => deleteBook(book._id)} style={redBtn}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );

  // 🔥 MAIN UI
  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/dashboard">Dashboard</Link>
        <Link style={linkStyle} to="/issued">Issued</Link>
        <Link style={linkStyle} to="/available">Available</Link>
        <Link style={linkStyle} to="/about">About</Link>
        <Link style={linkStyle} to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard books={books} />} />
        <Route path="/issued" element={<IssuedBooks books={books} />} />
        <Route path="/available" element={<AvailableBooks books={books} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

// 🎨 STYLES
const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "15px",
  background: "linear-gradient(to right, #1e3c72, #2a5298)",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold"
};

const cardStyle = {
  width: "250px",
  margin: "15px",
  padding: "15px",
  borderRadius: "15px",
  background: "#fff",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
};

const inputStyle = {
  padding: "8px",
  margin: "5px"
};

const greenBtn = { background: "green", color: "white", padding: "6px", margin: "5px" };
const blueBtn = { background: "blue", color: "white", padding: "6px", margin: "5px" };
const redBtn = { background: "red", color: "white", padding: "6px", margin: "5px" };
const orangeBtn = { background: "orange", color: "white", padding: "6px", margin: "5px" };
const purpleBtn = { background: "purple", color: "white", padding: "6px", margin: "5px" };

export default App;