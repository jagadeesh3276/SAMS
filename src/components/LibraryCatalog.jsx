import React, { useState } from "react";

const LibraryCatalog = () => {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "Computer Science",
      rack: "A1",
      row: "1",
      brandName: "Pearson",
      availability: "Available",
      copies: 5,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      rack: "B2",
      row: "3",
      brandName: "Scribner",
      availability: "Issued",
      copies: 0,
    },
    {
      title: "Data Science for Beginners",
      author: "Andrew Park",
      category: "Data Science",
      rack: "C1",
      row: "2",
      brandName: "O'Reilly",
      availability: "Available",
      copies: 3,
    },
    {
      title: "Physics Fundamentals",
      author: "Halliday & Resnick",
      category: "Science",
      rack: "D3",
      row: "4",
      brandName: "Wiley",
      availability: "Available",
      copies: 7,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    brandName: "",
    author: "",
    year: "",
    copies: "",
  });

  const searchCatalog = () => {
    // Filtering happens in render
  };

  const handleAddBook = () => {
    const { title, brandName, author, year, copies } = newBook;
    if (title && brandName && author && year && copies) {
      const newEntry = {
        title,
        author,
        category: "Uncategorized",
        rack: "Rack TBD",
        row: "Row TBD",
        brandName,
        availability: "Available",
        copies,
      };
      setBooks([...books, newEntry]);
      setShowPopup(false);
      setNewBook({ title: "", brandName: "", author: "", year: "", copies: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const filteredBooks = books.filter((book) => {
    const text = `${book.title} ${book.author} ${book.category}`.toLowerCase();
    return text.includes(searchInput.toLowerCase());
  });

  return (
    <main className="mt-[90px] ml-[250px] p-5 font-poppins">
      <h1 className="text-center mb-5 text-gray-800 text-2xl">📚 Library Catalog</h1>

      <div className="flex max-w-xl mx-auto gap-2 mb-5">
        <input
          type="text"
          placeholder="Search by title, author, or category..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 bg-blue-600 text-white rounded-r-md"
          onClick={searchCatalog}
        >
          Search
        </button>
        <button
          className="px-4 bg-green-600 text-white rounded-md"
          onClick={() => setShowPopup(true)}
        >
          Add New
        </button>
      </div>

      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Rack No</th>
            <th className="p-3 text-left">Row No</th>
            <th className="p-3 text-left">Brand Name</th>
            <th className="p-3 text-left">Availability</th>
            <th className="p-3 text-left">No. of Copies</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr
              key={index}
              className="hover:bg-blue-50"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{book.title}</td>
              <td className="p-3">{book.author}</td>
              <td className="p-3">{book.category}</td>
              <td className="p-3">{book.rack}</td>
              <td className="p-3">{book.row}</td>
              <td className="p-3">{book.brandName}</td>
              <td className="p-3">{book.availability}</td>
              <td className="p-3">{book.copies}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md w-96 flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Add New Book</h2>

            <input
              type="text"
              placeholder="Enter book title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Enter brand name"
              value={newBook.brandName}
              onChange={(e) => setNewBook({ ...newBook, brandName: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Enter author name"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Enter category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
             <input
              type="number"
              placeholder="Enter rack no"
              value={newBook.rackno}
              onChange={(e) => setNewBook({ ...newBook, rackno: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Enter row no"
              value={newBook.rowno}
              onChange={(e) => setNewBook({ ...newBook, rowno: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Enter number of copies"
              value={newBook.copies}
              onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddBook}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default LibraryCatalog;
