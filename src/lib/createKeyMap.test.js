import { describe, it, expect } from 'vitest';
import { createKeyMap } from './createKeyMap';

describe('createKeyMap', () => {
	describe('when given a layout with all the keys specified', () => {
		it('returns a full key map', () => {
			const colemakDh = "q w f p g j l u y ; [ ]\na r s t d h n e i o '\nz x c v b k m , . /";

			expect(createKeyMap(colemakDh)).toEqual({
				KeyQ: 'q',
				KeyW: 'w',
				KeyE: 'f',
				KeyR: 'p',
				KeyT: 'g',
				KeyY: 'j',
				KeyU: 'l',
				KeyI: 'u',
				KeyO: 'y',
				KeyP: ';',
				BracketLeft: '[',
				BracketRight: ']',
				KeyA: 'a',
				KeyS: 'r',
				KeyD: 's',
				KeyF: 't',
				KeyG: 'd',
				KeyH: 'h',
				KeyJ: 'n',
				KeyK: 'e',
				KeyL: 'i',
				Semicolon: 'o',
				Quote: "'",
				KeyZ: 'z',
				KeyX: 'x',
				KeyC: 'c',
				KeyV: 'v',
				KeyB: 'b',
				KeyN: 'k',
				KeyM: 'm',
				Comma: ',',
				Period: '.',
				Slash: '/'
			});
		});
	});

	describe('when given a layout with some end keys not specified', () => {
		it('does not not include their keys', () => {
			const colemakDh = 'q w f p g j l u y\na r s t d h n e i o\nz x c v b k m';

			expect(createKeyMap(colemakDh)).toEqual({
				KeyQ: 'q',
				KeyW: 'w',
				KeyE: 'f',
				KeyR: 'p',
				KeyT: 'g',
				KeyY: 'j',
				KeyU: 'l',
				KeyI: 'u',
				KeyO: 'y',
				KeyA: 'a',
				KeyS: 'r',
				KeyD: 's',
				KeyF: 't',
				KeyG: 'd',
				KeyH: 'h',
				KeyJ: 'n',
				KeyK: 'e',
				KeyL: 'i',
				Semicolon: 'o',
				KeyZ: 'z',
				KeyX: 'x',
				KeyC: 'c',
				KeyV: 'v',
				KeyB: 'b',
				KeyN: 'k',
				KeyM: 'm'
			});
		});
	});
});
