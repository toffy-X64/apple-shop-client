import api from '@api/axios.config.js';

export const productService = {
    getAll: async(data) => {
        const params = new URLSearchParams();

        if (data.page) {
            params.append('page', data.page);
        }

        if (data.sort) {
            params.append('sort', data.sort);
        }

        if (data.category) {
            params.append('category', data.category);
        }

        const url = '/products?' + params.toString();

        if (data.signal)
            return await api.get(url, {signal: data.signal});

        return await api.get(url);
    }
};