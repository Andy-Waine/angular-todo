module.exports = {
	HOST: 'localhost',
	USER: 'andy',
	PASSWORD: 'password',
	DB: 'nodelogin',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
