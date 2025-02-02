const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const signUp= async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExist= await User.findByEmail(email);
        if(userExist.length  > 0){
            return res.status(409).json({message: 'User already exists'});
        }

        const hashedPassword= await bcrypt.hash(password, 10);
        
        await User.create(name, email, hashedPassword);
        res.status(201).json({message: 'User created successfully'});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const login= async(req, res)=>{
    try {
        const {email, password}= req.body;
        
        if(!email || !password){
            return res.status(400).json({message: 'Email and Password are required.'});
        }

        const userExist= await User.findByEmail(email);
        if(userExist.length==0){
            return res.status(401).json({message: 'Inavlid  credentials'});
        };

        const isMatch= await bcrypt.compare(password, userExist[0].password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        };

        const token= jwt.sign({id: userExist.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token});
        
    } catch (error) 
    {
        console.log(error);
       res.status(500).json({message: 'Internal server error'}); 
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({message: 'Users fetched successfully', users});
    } catch (err) {
        res.status(500).json({ message: 'Database error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {

        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const users = await User.findByEmail(email);
        if (users.length > 0 && users[0].id != id) {
            return res.status(400).json({ message: 'This email is already taken by another user' });
        }

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const result = await User.update(id, name, email, hashedPassword);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        const deleteUser = await User.delete(id);
        if (deleteUser.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({ message: 'Database error' });
    }
};


module.exports = { signUp, login, getAllUsers, updateUser, deleteUser };