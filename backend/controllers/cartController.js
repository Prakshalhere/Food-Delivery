import userModel from "../models/userModle.js";

// add to cart functionality

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove from cart functionality

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({_id: req.body.userId});
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
      cartData[req.body.itemId] = 0;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success:true, message:"Item removed from cart!"});
  } catch (error) {
    console.log(error);
    res.json({success:false , message:"Error"})
  }
};

// get user cart functionality

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart, removeItemFromCart };
