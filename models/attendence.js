module.exports = {
	identity: 'attendence',
	
	connection: 'mysqlDB',
	schema:true,
	migrate: 'safe',
	
	attributes: {

   

	id:{type: 'string',
					primaryKey:true
					},

		name: 'string',	
		sidename: 'string',
		overtime: 'string',
		attendent: 'string',			
		status: 'string',
		date:'string'
		////////creted date is also a primery key in this table
		/*
		locations_to_user_Fk:{
			collection:'locations',
			via:'user_id'
		}*/
	}
};
