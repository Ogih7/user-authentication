
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const register = async (req, res) =>{
    try{
        const { username, password } = req.body
        const user = await User.findOne({username: username})
        if(user) return res.status(400).send('User already exists')
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await User.create({username: username, password: hashedPassword})
        res.status(201).json({message: 'User created successfully', user: newUser})
    }
     catch (err) {
        res.status(500).send(error.message)
    };
};

const login = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username: username})
        if(!user) return res.status(404).send('User does not exist')
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).send('Incorrect password')
        res.status(200).send('User successfully logged in')
    } 
     catch (err) {
        res.status(500).send(error.message)
    };
};

const deleteUser = async (req, res) =>{
    try{
        const {id} = req.params.id;
        const user = await User.findOneAndDelete({id:id})
        if(!user) return res.status(404).send('User not found')
        res.status(200).send({message: 'User deleted Successfully', user: user.username})
    }
    catch(err){
        res.status(500).send({message: error.message})
    };
};

const getUsers = async (req, res) => {
    try {
        const user = await User.find({})
        if(!user) return res.status(404).send('No users found')
        res.status(200).send(user)
    }
     catch (error) {
        res.status(500).send({message: error.message})
    };
};

const getUser = async (req, res) => {
    try{
        const {id} = req.params.id;
        const user = await User.findOne({id: id});
        if(!user) return res.status(404).send({message: "User not found"});
        res.status(200).json({message: "User found", user: user});
    }
     catch (error) {
        res.status(500).json({message:"Error getting user", error: error.message})
    };
};

module.exports = {register, login, deleteUser, getUsers, getUser};

