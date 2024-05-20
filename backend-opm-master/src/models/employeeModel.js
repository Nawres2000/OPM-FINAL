const mongoose = require('mongoose');
const User = require('./userModel')

const employeeSchema = new mongoose.Schema({
    firstName: { 
      type: String,
      required: true 
    },    
    lastName: { 
      type: String, 
      required: true 
    },
    birthDate: { 
      type: Date, 
      required: true 
    }
  });
  
  const Employee = User.discriminator('Employee', employeeSchema);
  
  module.exports = Employee;