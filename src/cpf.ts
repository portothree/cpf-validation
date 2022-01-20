export default class Cpf {
	value: string;
	private MIN_LENGTH = 11;
	private MAX_LENGTH = 14;
	private FACTOR_DIGIT_1 = 10;
	private FACTOR_DIGIT_2 = 11;

	constructor(value: string) {
		if (!this.validate(value)) {
			throw new Error('CPF provided is invalid');
		}
		this.value = value;
	}

	private formatCpf(cpf: string) {
		return cpf.replace(/[\.\-]*/g, '');
	}

	private isValidLength(cpf: string) {
		return (
			!(cpf.length >= this.MIN_LENGTH) || !(cpf.length <= this.MAX_LENGTH)
		);
	}

	private blacklistedCpf(cpf: string) {
		const [firstChar] = cpf;

		// Checks if every char/digit are equal
		return Array.from(this.formatCpf(cpf)).every(
			(char: string) => char === firstChar
		);
	}

	private calculateDigit(cpf: string, factor: number) {
		const total = Array.from(cpf).reduce((accumulator, currentChar) => {
			if (factor < 1) {
				return accumulator;
			}

			return (accumulator += parseInt(currentChar) * factor--);
		}, 0);
		const rest = total % 11;

		return rest < 2 ? 0 : 11 - rest;
	}

	private validate(cpf: string): boolean {
		const validations = [
			!cpf,
			this.isValidLength(cpf),
			this.blacklistedCpf(cpf),
		];

		if (validations.some((v) => !!v)) {
			return false;
		}

		const formattedCpf = this.formatCpf(cpf);

		/*
		 * The CPF validation algorithm calculates the first verifier
		 * digit from the first 9 (nine) chars of the CPF, then, calculates
		 * the second verifier digit from the first 9 (nine) chars, plus
		 * the first digit.
		 */
		let [digit1, digit2] = [
			this.calculateDigit(formattedCpf, this.FACTOR_DIGIT_1),
			this.calculateDigit(formattedCpf, this.FACTOR_DIGIT_2),
		];

		const actualDigits = formattedCpf.slice(9);
		const calculatedDigits = `${digit2}${digit2}`;
		return actualDigits === calculatedDigits;
	}
}
