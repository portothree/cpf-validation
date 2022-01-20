import Cpf from './cpf';

describe('CPF', () => {
	test.each([
		['111.111.111-11', false],
		['123.456.789-99', false],
		['935.411.347-80', true],
		['906.255.860-77', true],
	])('validate %s', (cpfChars, expected) => {
		const cpf = new Cpf(cpfChars);
		expect(cpf.value).toBe(expected);
	});
});
