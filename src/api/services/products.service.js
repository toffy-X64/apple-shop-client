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

        if (data.search) {
            params.append('search', data.search);
        }

        const url = '/products?' + params.toString();

        if (data.signal)
            return await api.get(url, {signal: data.signal});

        return await api.get(url);
    },
    order: async(data) => {
        return await api.post('/orders', {
            email: data.email,
            phone: data.phone,
            fullname: data.fullname,
            items: data.items,
            paymentType: data.paymentType
        })
    },
    getBySlug: async(slug, signal) => {
        if (signal)
            return await api.get('/products/' + slug, {signal: signal});
        
        return await api.get('/products/' + slug);
    }
};