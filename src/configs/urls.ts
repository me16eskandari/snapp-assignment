export const URLs = {

    passengers: {
        list: (limit: number, skip?: number, query?: string) => ({ method: "GET", url: `passenger?limit=${limit}&skip=${skip || 0}${query ? "&" + query : ""}` }),

        info: (id: number) => ({ method: "GET", url: `passenger/${id}` }),

        add: () => ({ method: "POST", url: "passenger" }),

        edit: (id: number) => ({ method: "PATCH", url: `passenger/${id}` }),

        delete: (id: number) => ({ method: "DELETE", url: `passenger/${id}` }),
    }

}