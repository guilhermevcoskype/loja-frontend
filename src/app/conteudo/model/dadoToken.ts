export interface DadoToken {
  sub: string;       // Geralmente o email/login
  roles: string[];   // Ou 'role' dependendo do seu backend
  exp: number;       // Data de expiração
  iat: number;
}