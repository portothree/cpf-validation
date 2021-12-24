export default class Cpf {
	value: string;

	constructor(value: string) {
		if (!this.validate(value)) {
			throw new Error('CPF provided is invalid');
		}
		this.value = value;
	}

	private formatCpf(cpf: string) {
		return cpf.replace(/[\.\-]*/g, '');
	}

	private validate(cpf: string): boolean {
		if (!cpf) {
			return false;
		}

		if (!(cpf.length >= 11) || !(cpf.length <= 14)) {
			return false;
		}

		const formattedCpf = this.formatCpf(cpf);

		if (formattedCpf.split('').every((c: any) => c === formattedCpf[0])) {
			return false;
		}

		let d1, d2;
		let dg1, dg2, rest;
		let digito;
		let nDigResult;
		d1 = d2 = 0;
		dg1 = dg2 = rest = 0;

		for (let nCount = 1; nCount < formattedCpf.length - 1; nCount++) {
			digito = parseInt(formattedCpf.substring(nCount - 1, nCount));
			d1 = d1 + (11 - nCount) * digito;

			d2 = d2 + (12 - nCount) * digito;
		}

		rest = d1 % 11;

		dg1 = rest < 2 ? (dg1 = 0) : 11 - rest;
		d2 += 2 * dg1;
		rest = d2 % 11;
		if (rest < 2) dg2 = 0;
		else dg2 = 11 - rest;

		let nDigVerific = formattedCpf.substring(
			formattedCpf.length - 2,
			formattedCpf.length
		);
		nDigResult = '' + dg1 + '' + dg2;
		return nDigVerific == nDigResult;
	}
}
