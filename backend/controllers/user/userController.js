import User from "../models/User.js";

export const getAddresses = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addAddress = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      label,
      isDefault,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    user.addresses.push({
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      label,
      isDefault,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message:
        "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      label,
      isDefault,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    const addressToUpdate =
      user.addresses.id(req.params.id);

    if (!addressToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    addressToUpdate.fullName =
      fullName;

    addressToUpdate.phone =
      phone;

    addressToUpdate.address =
      address;

    addressToUpdate.city = city;

    addressToUpdate.state =
      state;

    addressToUpdate.pincode =
      pincode;

    addressToUpdate.label =
      label;

    addressToUpdate.isDefault =
      isDefault;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE ADDRESS
export const deleteAddress = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    user.addresses =
      user.addresses.filter(
        (addr) =>
          addr._id.toString() !==
          req.params.id
      );

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};