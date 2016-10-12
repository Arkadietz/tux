module.exports = function(ircbot, config) {
	var request = require('request');
	
	ircbot.addListener('message', function (from, to, message) {
		if (to !== config.irc.announceChannel || message !== '!who') {
			return;
		}
		
		request({
			url: 'https://fauna.initlab.org/api/users/present.json',
			json: true
		}, function(error, response, body) {
			if (error !== null || response.statusCode !== 200) {
				ircbot.say(to, 'Error getting data');
				return;
			}
			
			var mystery_users = body.filter(function(user) {
				return user.id === null;
			}).length;
			
			var people = body.filter(function(user) {
				return user.id !== null;
			}).map(function(user) {
				return user.name + ' (' + user.username + ')';
			});
			
			if (people.length === 0) {
				ircbot.say(to, 'No one in init Lab :(');
				return;
			}

			var mystery_str = '';
			
			if (mystery_users > 0) {
				if (mystery_users === 1) {
					mystery_str = 'Mystery labber';
				}
				else {
					mystery_str = mystery_users + ' Mystery labbers';
				}
				
				people.push(mystery_str);
			}
			
			ircbot.say(to, 'People in init Lab: ' + people.join(', '));
		});
	});
};
