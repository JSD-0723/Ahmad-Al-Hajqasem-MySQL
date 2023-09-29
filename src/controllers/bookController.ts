import { Request, Response } from 'express'; // Assuming you're using Express
const createModels=require('../models/bookModel')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const modelsMap = createModels();
const Book=modelsMap['book']
const User=modelsMap['user']
import dotenv from 'dotenv';
const key:any=process.env.tokenKey

// Type for book information in the request body
interface BookInformation {
  name: string;
  AuthorName: string;
}

interface UserInformation{
  name:string,
  password:string
}

// Type for a book object
interface BookObject {
  id: number;
  name: string;
  AuthorName: string;
}
//############################# token process##############################
const generateToken = (payload: any, secret: string) => {
	const token = jwt.sign(payload, secret);
	return token;
}

const decodeToken = (token: string, secret: string) => {
	const decoded = jwt.verify(token, secret);
	return decoded;
}

export const login = (req: Request, res: Response) => {
  const userInformation: UserInformation = req.body;
  User.findOne({where:{name:userInformation.name},attributes: ['password','id']}).
 
  then((userinfo:any) => {
    console.log(userinfo)
    bcrypt.compare(userInformation.password, userinfo['password'], (err:any, result:any) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        // Handle the error, perhaps by sending an error response to the user
      } else if (result) {
        const Token=generateToken({'id':userinfo['id']},key)
        res.status(200).send(Token)
       
      } else {
        // Passwords don't match, deny access
        res.status(404).send('Password does not match');
        // You may want to send an error response or redirect the user to a login page
      }
    })})
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

export const createUser = (req: Request, res: Response) => {
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,'hellofromanotherside#adell#1258974')
  }catch(err){
    res.status(505).send('unautorized')
  }
  const userInformation: UserInformation = req.body;
  User.create({
    name: userInformation.name,
    password: userInformation.password,
  })
    .then(() => res.status(200).send('user created'))
    .catch((err: Error) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};
//############################################################################################


/// Create a new book
export const createBook = (req: Request, res: Response) => {
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,key)
  }catch(err){
    res.status(505).send('unautorized')
  }
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
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,key)
  }catch(err){
    res.status(505).send('unautorized')
  }
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
  console.log("arive to uesr id")
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,key)
  }catch(err){
    res.status(505).send('unautorized')
  }
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
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,key)
  }catch(err){
    res.status(505).send('unautorized')
  }
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
export const allBookRentByUser=(req:Request,res:Response)=>{

  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log("arive here")
  console.log(Token)
  try{
    const pylod=decodeToken(Token,key)
    var userId=pylod['id']
    console.log("ARRRRRRRRRRIVE")

  }catch(err){
    res.status(505).send('unautorized')
  }
  console.log(userId)
  Book.findAll({where:{userId:userId}})
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
    

}
export const rentByUser = (req: Request, res: Response) => {
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    const pylod=decodeToken(Token,key)
    var userId=pylod['id']

  }catch(err){
    res.status(505).send('unautorized')
  }
  console.log(userId)
  const bookId: number = req.body.id;
 

  Book.update({'userId':userId}, {
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
  const bearerToken :any=req.headers['authorization'];
  const Token = bearerToken.split(' ')[1];
  console.log(Token)
  try{
    decodeToken(Token,key)
  }catch(err){
    res.status(505).send('unautorized')
  }
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
