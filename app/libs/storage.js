export default {
	get: function(k) {
		try {
			//JSON.parse() returns us a js object we can work with
			return JSON.parse(localStorage.getItem(k));
		}
		catch(e) {
			return null;
		}
	},
	set: function(k, v) {
		//localStorage expects strings, meaning it's JSON,
		//so we must serialize, i.e. parse(), stringify(), our objects both ways.
		localStorage.setItem(k, JSON.stringify(v));
	}
};