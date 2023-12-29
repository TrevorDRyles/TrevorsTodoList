'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            userid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            // todolistid: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'todolist',
            //         key: 'todolistid',
            //     },
            //     onUpdate: 'CASCADE',
            //     onDelete: 'CASCADE',
            // },
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    }
};
