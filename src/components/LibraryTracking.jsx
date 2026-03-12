import React, { useState } from "react";

const initialBooks = [
  {
    sno: 1,
    libId: "LIB001",
    userId: "STU001",
    name: "John Doe",
    bookName: "Data Structures",
    issuingDate: "2025-08-01",
    returningDate: "2025-08-15",
    expandingDate: "2025-08-20",
    status: "pending",
  },
  {
    sno: 2,
    libId: "LIB002",
    userId: "TCH001",
    name: "Jane Smith",
    bookName: "Operating Systems",
    issuingDate: "2025-08-05",
    returningDate: "2025-08-18",
    expandingDate: "-",
    status: "submitted",
  },
  {
    sno: 3,
    libId: "LIB003",
    userId: "STU002",
    name: "Alice Johnson",
    bookName: "Database Systems",
    issuingDate: "2025-08-10",
    returningDate: "2025-08-22",
    expandingDate: "2025-08-25",
    status: "pending",
  },
  {
    sno: 4,
    libId: "LIB004",
    userId: "TCH002",
    name: "Bob Wilson",
    bookName: "Computer Networks",
    issuingDate: "2025-08-12",
    returningDate: "2025-08-24",
    expandingDate: "-",
    status: "submitted",
  },
];

const LibraryTracking = () => {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    libId: "",
    userId: "",
    name: "",
    bookName: "",
    issuingDate: "",
    returningDate: "",
    status: "pending",
    expandingDate: "-",
  });

  const handleStatusChange = (index, value) => {
    const updatedBooks = [...books];
    updatedBooks[index].status = value;
    setBooks(updatedBooks);
  };

  const toggleEdit = (index) => {
    const updatedBooks = [...books];
    updatedBooks[index].isEditing = !updatedBooks[index].isEditing;
    setBooks(updatedBooks);
  };

  const handleChange = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);
  };

  const handleAddBook = () => {
    const nextSno = books.length + 1;
    setBooks([...books, { sno: nextSno, ...newBook }]);
    setNewBook({
      libId: "",
      userId: "",
      name: "",
      bookName: "",
      issuingDate: "",
      returningDate: "",
      status: "pending",
      expandingDate: "-",
    });
    setShowModal(false);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.libId.toUpperCase().includes(search.toUpperCase()) ||
      book.userId.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className="ml-[250px] mt-[90px] p-5 font-poppins">
      <h2 className="text-center text-2xl mb-5 text-gray-800">
        Library Book Issue & Return Tracking
      </h2>
      <div className="flex justify-center items-center mb-5 gap-2">
        <input
          type="text"
          placeholder="Search by Library ID or Teacher/Student ID..."
          className="px-3 py-2 w-[250px] border border-gray-300 rounded-md text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] relative">
            <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Library ID"
                className="px-3 py-2 border rounded"
                value={newBook.libId}
                onChange={(e) =>
                  setNewBook({ ...newBook, libId: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Teacher/Student ID"
                className="px-3 py-2 border rounded"
                value={newBook.userId}
                onChange={(e) =>
                  setNewBook({ ...newBook, userId: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Name"
                className="px-3 py-2 border rounded"
                value={newBook.name}
                onChange={(e) =>
                  setNewBook({ ...newBook, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Book Name"
                className="px-3 py-2 border rounded"
                value={newBook.bookName}
                onChange={(e) =>
                  setNewBook({ ...newBook, bookName: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Issuing Date"
                className="px-3 py-2 border rounded"
                value={newBook.issuingDate}
                onChange={(e) =>
                  setNewBook({ ...newBook, issuingDate: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Returning Date"
                className="px-3 py-2 border rounded"
                value={newBook.returningDate}
                onChange={(e) =>
                  setNewBook({ ...newBook, returningDate: e.target.value })
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleAddBook}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse shadow-md bg-white">
        <thead>
          <tr>
            {[
              "S.No",
              "Library ID",
              "Teacher/Student ID",
              "Name",
              "Book Name",
              "Issuing Date",
              "Returning Date",
              "Expanding Date",
              "Action",
              "Edit",
            ].map((head, idx) => (
              <th
                key={idx}
                className="px-4 py-3 border border-gray-300 text-center bg-blue-600 text-white"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : ""}>
              <td
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
              >
                {book.sno}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) => handleChange(idx, "libId", e.target.textContent)}
              >
                {book.libId}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) => handleChange(idx, "userId", e.target.textContent)}
              >
                {book.userId}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) => handleChange(idx, "name", e.target.textContent)}
              >
                {book.name}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) =>
                  handleChange(idx, "bookName", e.target.textContent)
                }
              >
                {book.bookName}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) =>
                  handleChange(idx, "issuingDate", e.target.textContent)
                }
              >
                {book.issuingDate}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) =>
                  handleChange(idx, "returningDate", e.target.textContent)
                }
              >
                {book.returningDate}
              </td>
              <td
                contentEditable={book.isEditing || false}
                className={`px-4 py-3 border text-center ${
                  book.isEditing ? "bg-gray-100" : ""
                }`}
                onBlur={(e) =>
                  handleChange(idx, "expandingDate", e.target.textContent)
                }
              >
                {book.expandingDate}
              </td>
              <td className="px-4 py-3 border text-center">
                {book.status === "pending" ? (
                  <span className="bg-yellow-400 text-white px-2 py-1 rounded">
                    Pending
                  </span>
                ) : (
                  <span className="bg-green-600 text-white px-2 py-1 rounded">
                    Submitted
                  </span>
                )}
                <select
                  className="ml-2 px-2 py-1 border rounded text-sm"
                  value={book.status}
                  onChange={(e) => handleStatusChange(idx, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                </select>
              </td>
              <td className="px-4 py-3 border text-center">
                <button
                  className={`px-2 py-1 rounded text-white text-sm ${
                    book.isEditing
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={() => toggleEdit(idx)}
                >
                  {book.isEditing ? "Save" : "Edit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryTracking;
