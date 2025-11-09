export type SampleCredential = {
  label: string;
  email: string;
  senha: string;
};

export const sampleCredentials: SampleCredential[] = [
  { label: 'Paciente - Ana', email: 'ana.paciente@hc.com', senha: '123456' },
  { label: 'Paciente - Bruno', email: 'bruno.paciente@hc.com', senha: '123456' },
  { label: 'Paciente - Carla', email: 'carla.paciente@hc.com', senha: '123456' },
  { label: 'Profissional - Henrique', email: 'henrique.prof@hc.com', senha: '123456' },
  { label: 'Profissional - Marina', email: 'marina.prof@hc.com', senha: '123456' },
];
