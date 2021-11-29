import { validate } from './cpf';

describe(validate.name, () => {
	test.each([
		['111.111.111-11', false],
		['123.456.789-99', false],
		['935.411.347-80', true],
	])('validate(%s)', (cpf, expected) => {
		const result = validate(cpf);
		expect(result).toBe(expected);
	});
});
