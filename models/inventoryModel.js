const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  inventoryType: {
    type: String,
    required: [true, "inventory type require"],
    enum: ["in", "out"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Blood group is required"],
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
  },
  quantity:{
    type:Number,
    require:[true,'Blood quantity is require']
  },
  organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:[true, 'organisation is require']
  },
  hospital:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users',
       required: function() {
        return this.inventoryType =="out"
       }
  },
  doner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: function(){
        return this.inventoryType === "in";
    }
  }
},{timestamps:true});

module.exports = mongoose.model("Inventory", inventorySchema);
