
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
class ChatMessage extends Model {
    static associate(models) {
        // define association here
        this.belongsTo(models.User, {
            foreignKey: "sender_id",
            as: 'sender'
        });
        this.belongsTo(models.User, {
            foreignKey: "receiver_id",
            as: 'receiver'
        });
    }
}
ChatMessage.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    conversation_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    message: {
        allowNull: false,
        type: DataTypes.STRING
    },
    is_seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_sms:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        type: 'TIMESTAMP',
    },
    updated_at: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP',
    },
}, {
    sequelize,
    modelName: 'ChatMessage',
    tableName: 'chat_messages',
    timestamps: false
});
module.exports = ChatMessage;