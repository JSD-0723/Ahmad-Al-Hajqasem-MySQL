import { Request, Response } from 'express'; // Assuming you're using Express
const createBookModel=require('../models/bookModel')

const Book = createBookModel();

// Type for book information in the request body
interface BookInformation {
  name: string;
  AuthorName: string;
}

// Type for a book object
interface BookObject {
  id: number;
  name: string;
  AuthorName: string;
}

// Create a new book
export const createBook = (req: Request, res: Response) => {
  const bookInformation: BookInformation = req.body;
  Book.create({
    name: bookInformation.name,
    AuthorName: bookInformation.AuthorName,
  })
    .then(() => res.status(200).send('Book created'))
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

// Get all books
export const getAllBooks = (req: Request, res: Response) => {
  Book.findAll()
    .then((selectedBooks: BookObject[]) => {
      if (!selectedBooks || selectedBooks.length === 0) {
        return res.status(404).send('Books not found');
      }
      console.log('All books are selected');
      res.status(200).json(selectedBooks);
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

// Get a single book by ID
export const getBookById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send('Invalid ID');
  }

  Book.findByPk(id)
    .then((selectedBook: BookObject | null) => {
      if (!selectedBook) {
        return res.status(404).send('Book not found');
      }
      console.log('Book selected:', selectedBook);
      res.status(200).json(selectedBook);
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

// Update a book by ID
export const updateBook = (req: Request, res: Response) => {
  const bookId: number = req.body.id;
  const updatedBookInformation: BookInformation = req.body;

  Book.update(updatedBookInformation, {
    where: { id: bookId },
  })
    .then(() => {
      res.status(200).send('Updated');
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

// Delete a book by ID
export const deleteBook = (req: Request, res: Response) => {
  const bookId: number = req.body.id;

  Book.destroy({
    where: { id: bookId },
  })
    .then(() => {
      res.status(200).send('Deleted');
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};
