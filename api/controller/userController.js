const User = require('../model/userModel')

exports.update = async (req, res, next) => {
    try {
       const update = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        //so when updating it will follow our data validation that is set in our schema
        runValidators: true
      })
      res.status(200).json({
        status: 'success',
        data: {
          data: update
        }})
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}
exports.deleteUser =async (req, res, next) => {
    try {
       await User.findByIdAndDelete(req.params.id)
      res.status(200).json({
            status: 'success',
            data: "User deleted"
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getOnUser=async (req, res, next) => {
    try {
      const Users = await User.findById(req.params.id)
      res.status(200).json({
            status: 'success',
            data: Users
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}

exports.getAllUsers=async (req, res, next) => {
    try {
      const Users = await User.find()
      res.status(200).json({
            status: 'success',
            data: Users
        })
    } catch (err) {
        res.status(404).json({message: err.message});
    }

}