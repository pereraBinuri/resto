import { environment } from "../environments/environment.prod";

export class Login {
  username: string = '';
  password: string = '';
  grant_type: string = 'password';
  client_id: number = 4;
  client_secret: string = 'wi1ciuewRqbIHgoEQMizPUyx0dYnBknDnojLWXGa';
  scope: string = '';
  account_brand: number = 1;
}
