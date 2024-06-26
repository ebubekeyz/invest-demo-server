const Penalty = require('../models/Penalty');
const PayReceipt = require('../models/PayReceipt');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const nodemailer = require('nodemailer');

const createPenalty = async (req, res) => {
  req.body.user = req.user.userId;
  const penalty = await Penalty.create(req.body);

  res.status(StatusCodes.OK).json({ penalty, count: penalty.length });
};

const getAllPenalty = async (req, res) => {
  const penalty = await Penalty.find({});

  res.status(StatusCodes.OK).json({ penalty, count: penalty.length });
};

const getUserPenalty = async (req, res) => {
  const penalty = await Penalty.find({ user: req.user.userId });

  res.status(StatusCodes.OK).json({ penalty, count: penalty.length });
};

const updatePenalty = async (req, res) => {
  const { id: penaltyId } = req.params;
  const penalty = await Penalty.findOneAndUpdate({ _id: penaltyId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!penaltyId) {
    throw new CustomError.BadRequestError(
      `No penalty with id ${penaltyId} exist`
    );
  }

  res.status(StatusCodes.OK).json({ penalty });
};

const getSinglePenalty = async (req, res) => {
  const { id: penaltyId } = req.params;
  const penalty = await Penalty.findOne({ _id: penaltyId });
  if (!penaltyId) {
    throw new CustomError.BadRequestError(
      `No Penalty with id ${penaltyId} exist`
    );
  }
  res.status(StatusCodes.OK).json({ Penalty });
};

const deletePenalty = async (req, res) => {
  const { id: penaltyId } = req.params;
  const penalty = await Penalty.findByIdAndRemove({ _id: penaltyId });
  if (!penaltyId) {
    throw new CustomError.BadRequestError(
      `No Penalty with id ${penaltyId} exist`
    );
  }
  res.status(StatusCodes.OK).json({ msg: 'Penalty successfully deleted' });
};

const deleteAllPenalty = async (req, res) => {
  const penalty = await Penalty.deleteMany();

  res.status(StatusCodes.OK).json({ msg: 'Penalty successfully deleted' });
};

const getUserPenalty2 = async (req, res) => {
  const { id: userId } = req.params;
  const penalty = await Penalty.find({ user: userId });
  res.status(StatusCodes.OK).json({ penalty, count: penalty.length });
};

const deleteUserPenalty = async (req, res) => {
  const { id: userId } = req.params;
  const penalty = await Penalty.deleteMany({ user: userId });

  res.status(StatusCodes.OK).json({ msg: 'profit successfully deleted' });
};

const deletePenalty2 = async (req, res) => {
  const { id: penaltyId } = req.params;
  const penalty = await Penalty.deleteMany({ userIdNumber: penaltyId });
  if (!penaltyId) {
    throw new CustomError.BadRequestError(
      `No Penalty with id ${penaltyId} exist`
    );
  }
  res.status(StatusCodes.OK).json({ msg: 'penalty successfully deleted' });
};
module.exports = {
  deletePenalty2,
  deleteUserPenalty,
  createPenalty,
  getAllPenalty,
  getUserPenalty,
  updatePenalty,
  getSinglePenalty,
  deletePenalty,
  deleteAllPenalty,
  getUserPenalty2,
};
