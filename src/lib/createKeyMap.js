export const ansiAmericanLayout = [
	[
		'KeyQ',
		'KeyW',
		'KeyE',
		'KeyR',
		'KeyT',
		'KeyY',
		'KeyU',
		'KeyI',
		'KeyO',
		'KeyP',
		'BracketLeft',
		'BracketRight',
		'Backslash'
	],
	['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']
];

export const qwertyKeyMap = {
	KeyQ: 'q',
	KeyW: 'w',
	KeyE: 'e',
	KeyR: 'r',
	KeyT: 't',
	KeyY: 'y',
	KeyU: 'u',
	KeyI: 'i',
	KeyO: 'o',
	KeyP: 'p',
	BracketLeft: '[',
	BracketRight: ']',
	Backslash: '\\',
	KeyA: 'a',
	KeyS: 's',
	KeyD: 'd',
	KeyF: 'f',
	KeyG: 'g',
	KeyH: 'h',
	KeyJ: 'j',
	KeyK: 'k',
	KeyL: 'l',
	Semicolon: ':',
	Quote: '"',
	KeyZ: 'z',
	KeyX: 'x',
	KeyC: 'c',
	KeyV: 'v',
	KeyB: 'b',
	KeyN: 'n',
	KeyM: 'm',
	Comma: ',',
	Period: '.',
	Slash: '/'
};

const specialShiftMapping = {
	1: '!',
	2: '@',
	3: '#',
	4: '$',
	5: '%',
	6: '^',
	7: '&',
	8: '*',
	9: '(',
	0: ')',
	'`': '~',
	'-': '_',
	'=': '+',
	'[': '{',
	']': '}',
	'\\': '|',
	';': ':',
	"'": '"',
	',': '<',
	'.': '>',
	'/': '?'
}; // TODO

export const ansiAmericanLayoutValues = [
	'qwertyuiop[]\\'.split(''),
	"asdfghjkl;'".split(''),
	'zxcvbnm,./'.split('')
];

export function createKeyMap(layoutString, keyboardLayout = ansiAmericanLayout) {
	const layoutRows = layoutString.trim().split('\n');

	let remapObject = {};

	layoutRows.forEach((row, rowIndex) => {
		// Remove extra spaces and split by space to get individual characters
		const chars = row.trim().split(/\s+/);
		keyboardLayout[rowIndex].forEach((code, index) => {
			if (index < chars.length) {
				// Map the event.code to the specified character
				remapObject[code] = chars[index];
			}
		});
	});

	return remapObject;
}
