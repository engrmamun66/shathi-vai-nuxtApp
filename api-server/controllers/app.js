const { StatusCodes } = require('http-status-codes');
const ChatMessage = require('../models/ChatMessage');
const { Op } = require("sequelize");

const getAllMessages = async (data) => {
   
    try {
        const dataLimit = 20
        if(data?.message_id){
            const result = await ChatMessage.findAll({
                where: {
                    id: {
                        [Op.lt]: data.message_id,
                    },
                    [Op.or]: [
                        {
                            'sender_id': data.sender_id,
                            'receiver_id': data.receiver_id
                        },
                        {
                            'sender_id': data.receiver_id,
                            'receiver_id': data.sender_id
                        }
                    ]
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: dataLimit
               
            })
            return result;
        }else{
           
            const result = await ChatMessage.findAll({
                where: {
                    [Op.or]: [
                        {
                            'sender_id': data.sender_id,
                            'receiver_id': data.receiver_id
                        },
                        {
                            'sender_id': data.receiver_id,
                            'receiver_id': data.sender_id
                        }
                    ]
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: dataLimit
              
            })
            return result;
        }
    } catch (error) {
        return error
    }
};
const getdAllMessagesByGuardId = async (data) => {

    try {
        const dataLimit = 20
        let result
        if (data?.message_id) {
            if(data?.role_type == 'dispatcher'){
                result = await ChatMessage.findAll({
                    where: {
                        id: {
                            [Op.lt]: data.message_id,
                        },
                        [Op.or]: [
                            {
                                'sender_id': data.sender_id,
                                'receiver_id': data.receiver_id
                            },
                            {
                                'sender_id': data.receiver_id,
                                'receiver_id': data.sender_id
                            }
                        ]
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: dataLimit

                })

            }else{
                    result = await ChatMessage.findAll({
                        where: {
                            id: {
                                [Op.lt]: data.message_id,
                            },
                            [Op.or]: [
                                {
                                    'sender_id': data.guard_id,
                                },
                                {
                                    'receiver_id': data.guard_id
                                }
                            ]
                        },
                        order: [
                            ['id', 'DESC']
                        ],
                        limit: dataLimit
                    })
            }
            return result;
        } else {
            if (data?.role_type == 'dispatcher') {
                result = await ChatMessage.findAll({
                    where: {
                        [Op.or]: [
                            {
                                'sender_id': data.sender_id,
                                'receiver_id': data.receiver_id
                            },
                            {
                                'sender_id': data.receiver_id,
                                'receiver_id': data.sender_id
                            }
                        ]
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: dataLimit
                })
            }else{
                result = await ChatMessage.findAll({
                    where: {
                        [Op.or]: [
                            {
                                'sender_id': data.guard_id,
                            },
                            {
                                'receiver_id': data.guard_id
                            }
                        ]
                    },
                    order: [
                        ['id', 'DESC']
                    ],
                    limit: dataLimit

                })
            }
            
            return result;
        }
    } catch (error) {
        return error
    }
};
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
const makeResponse = (payload, data) =>{
    let response = {
        payload,
        data
    }
    return response
}
module.exports = {
    login,
    getAllMessages,
    updateMessage,
    getdAllMessagesByGuardId,
    makeResponse
};
