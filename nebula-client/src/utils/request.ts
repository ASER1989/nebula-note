export type Response<T> = {
    success: boolean;
    data: T;
    error: string | Record<string, unknown>;
};

const headers = {
    'Content-Type': 'application/json',
};

export default {
    post<T>(
        url: string,
        dataObj: Record<string, unknown>,
        initOptions?: Record<string, unknown>,
    ) {
        return new Promise<Response<T>>((resolve, reject) => {
            fetch('/api' + url, {
                method: 'POST',
                headers,
                body: JSON.stringify(dataObj),
                ...initOptions,
            })
                .then((resp) =>
                    resp.json().then((res) => {
                        if (res.success) {
                            resolve(res);
                        } else {
                            reject(res.error);
                        }
                    }),
                )
                .catch((ex) => reject(ex));
        });
    },
    upload<T>(
        url: string,
        file: File,
        dataObj?: Record<string, unknown>,
        initOptions?: Record<string, unknown>,
    ) {
        return new Promise<Response<T>>((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            Object.keys(dataObj ?? {}).forEach((key) => {
                formData.append(key, dataObj?.[key] as never);
            });

            fetch('/api' + url, {
                method: 'POST',
                body: formData,
                ...initOptions,
            })
                .then((resp) =>
                    resp.json().then((res) => {
                        if (res.success) {
                            resolve(res);
                        } else {
                            reject(res.error);
                        }
                    }),
                )
                .catch((ex) => reject(ex));
        });
    },
    get<T>(
        url: string,
        params?: Record<string, unknown>,
        initOptions?: Record<string, unknown>,
    ) {
        const paramsStr = Object.keys(params ?? {})
            .map((key) => {
                const value =
                    typeof params?.[key] === 'object'
                        ? encodeURIComponent(JSON.stringify(params?.[key]))
                        : encodeURIComponent(params?.[key] as string);
                return `${encodeURIComponent(key)}=${value}`;
            })
            .join('&');

        const reqUrl = ['/api' + url, paramsStr]
            .filter((item) => item !== undefined)
            .join('?');

        return new Promise<Response<T>>((resolve, reject) => {
            fetch(reqUrl, {
                method: 'GET',
                headers,
                ...initOptions,
            })
                .then((resp) =>
                    resp.json().then((res) => {
                        if (res.success) {
                            resolve(res);
                        } else {
                            reject(res.error);
                        }
                    }),
                )
                .catch((ex) => reject(ex));
        });
    },
};
