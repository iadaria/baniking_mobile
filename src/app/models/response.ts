import { AxiosError, AxiosResponse } from 'axios';

export const isSuccessStatus = (status: number): boolean =>
  [200, 201].includes(status);

export type Done = {
  message: string;
};

export type Fail /* <T extends { [key: string]: string[] }> */ = {
  message: string;
  errors: { [key: string]: string[] };
};

export type RequestParams<T = any, P = any> = {
  body?: T;
  params?: P;
};

export type ResponseDone<T = any> = {
  data: {
    data: T;
  };
};

export type ResponseFail = AxiosResponse<Fail>;
export type ResultFail = AxiosError<Fail>;

/***
 * "data": {
        "message": "The given data was invalid.",
        "errors": {
            "phone": [
                "Пользователь с данным телефоном уже зарегистрирован"
            ],
            "email": [
                "Пользователь с данным электронным адресом уже зарегистрирован"
            ]
        }
    },
    "status": 422,
    headers: {...},
    config: {...},
    request: {}
 */
