import { IUser } from "@/types";

export interface InitialState {
  user: IUser | null;
  token: string | null;
}
