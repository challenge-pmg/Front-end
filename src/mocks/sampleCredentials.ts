export type SampleCredential = {
  label: string;
  email: string;
  senha: string;
};

export const sampleCredentials: SampleCredential[] = [
  { label: 'Paciente', email: 'ana.paciente@hc.com', senha: '123456' },
  { label: 'Profissional', email: 'henrique.prof@hc.com', senha: '123456' },
];
