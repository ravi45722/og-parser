/*  *
 *  * @author Ravi Sankar Reddy.S
 *  * @classDescription  logger is the core file which exports the logger object
 *  * 
 *  */

var winston = require('winston');
var dt 		= require('datetimejs');
var config	= require('config');
require('winston-daily-rotate-file');

var fileName = config.logs.fileName;

global.logger = new (winston.Logger)({
	transports : [ 
		new (winston.transports.Console)({
			level : config.logs.consoleLevel,
			json  : false,
			timestamp : function () {
				var date = new Date();
				var temp = dt.strftime(date,'%Y-%m-%d %H:%M:%S:%r');
				return temp;
			},
			handleExceptions: false,
			colorize: false
		}), 
		new (winston.transports.DailyRotateFile)({	
				filename : fileName, 
				datePattern: 'yyyy-MM-dd.',
				prepend: true,
				level : config.logs.loggerLevel, 
				json : false, 
				maxsize : config.logs.maxSize, 
				maxFiles: config.logs.maxFiles,
				timestamp :function(){
					var date=new Date();
					var temp=dt.strftime(date,'%Y-%m-%d %H:%M:%S:%r');
					return temp;
				}
		}) 
	]
});
