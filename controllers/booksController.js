const bcrypt = require('bcrypt')
const Book = require('../models/books')
require('dotenv').config()

exports.upload_book = async(req, res)=> {
    try {
        const {title, author, category}= req.body

		if (!title ||
			!author ||
			!category 
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

        const existingBook = await Book.findOne({title})
        if(existingBook){
            return res.status(400).json({
                success: false,
                message: "Book already exists"
            })
        }

        const Book = await Book.create({
            title, author, category,
        })

        return res.status(200).json({
            success: true,
            Book,
            message: "Book created successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "Book registration failed"
        })
    }
}

