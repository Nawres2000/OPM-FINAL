const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Employee = require('../models/employeeModel');
const Contract = require('../models/contractModel');
const Folder = require('../models/folderModel');
const tokenGen = require("../middlewares/tokenMiddleware");
const sendEmail = require('../middlewares/mailer');

exports.register = async (req, res) => {
  const { email, password, authority } = req.body;
  let Model;
  switch (authority) {
    case 'client':
      Model = Client;
      break;
    case 'technician':
      Model = Employee;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const userExists = await Model.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let obj = (Model) (req.body) ;
    obj.password = hashedPassword;
    //creating contract
    if (authority == 'client'){
      const contract = Contract(req.body);
      await contract.save();
      obj.contractId = contract._id;
      const folder = Folder({ name: obj.company+"'s folder", contractId: contract._id, clientId: obj._id });
      await folder.save();
    }
    await obj.save();

    const to = 'opm.mailers@gmail.com';
    const subject = 'User - '+obj._id;
    const text = 'A user just been added.';
    await sendEmail(to ,subject,text);
    
    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await Admin.findOne({ email });
    if (!user){
    user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }}

    if (user.valid == false) {
      return res.status(404).json({ message: 'account in progress' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }
    var contract;
    var folder ;
    var nameFolder = null
    if (user.authority == "client"){
      contract = await Contract.findById(user.contractId);
      folder = await Folder.find({clientId:user._id})
       nameFolder =folder[0].name 
    }
  
    const payload = {user, contract,folder:nameFolder};
    const { accessToken, refreshToken } = await tokenGen.generateToken(user);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    //res.setHeader('Refresh-Token', refreshToken); it will be sent with httpOnly cookie 
    res.status(200).json({ message: 'Login successful', payload, accessToken, refreshToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// exports.verifyToken = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const { tokenDetails, message, error } = await tokenGen.verifyToken(token);
//     res.status(200).json({ tokenDetails, message, error });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error });
//   }
// };


exports.verify = async (req, res, next) => {
  try {
    if (!req.headers.authorization){
      throw("invalid token");
    }
    const token = req.headers.authorization.split(' ')[1];
    const { tokenDetails, message ,error } = await tokenGen.verifyToken(token);
    if(error){
      res.status(500).json({ message: message });
      return;
    }
    res.setHeader('Authorization', `Bearer ${tokenDetails.AccessToken}`);
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { message } = await tokenGen.deleteToken(token);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};