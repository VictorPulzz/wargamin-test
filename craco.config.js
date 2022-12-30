const path = require('path');

const SRC_PATH = path.join(__dirname, './src');

module.exports = {
	webpack: {
		alias: {
			'~': path.resolve(__dirname, SRC_PATH),
		}
	},
}
