const { StatusCodes } = require('http-status-codes');
const ChatMessage = require('../models/User');
const { Op } = require("sequelize");

const login = async (messageData) => {
    try {
        let payload = {
            message: null,
            sender_id: null,
            receiver_id: null,
            conversation_id: 11,
            is_seen: false,
            is_sms: false,
            ...messageData,
        }
        let result = await ChatMessage.create(payload)
        let response = await ChatMessage.findOne({
            where: {
                'id': result.id
            }
        });
       
        if (response?.errors?.length > 0 ) {
            return response.errors[0].message
        } else {
            return response
        }
    } catch (error) {
        return error
    }

};
const updateMessage = async (messageData) => {
    try {
        await ChatMessage.update({ message: messageData.message}, {
            where: { id: messageData.id }
        })
        let response = await ChatMessage.findOne({
            where: {
                'id': messageData.id
            }
        });

        if (response?.errors?.length > 0) {
            return response.errors[0].message
        } else {
            return response
        }
    } catch (error) {
        return error
    }

};
module.exports = {
    login
};
