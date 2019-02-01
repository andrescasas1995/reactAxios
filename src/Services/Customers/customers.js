import ApiTools from '../api';

export default {
    getCustomer() {
        return ApiTools.api.get(ApiTools.services.customers);
    },
    postCustomer(customer) {
        return ApiTools.api.post(ApiTools.services.customers, 
        {
            documentNumber: customer.documentNumber,
            firstName: customer.firstName,
            secondName: customer.secondName,
            lastName: customer.lastName,
            secondLastName: customer.secondLastName,
            adress: customer.adress,
            phone: customer.phone,
            documentType: customer.documentType
        });
    },
    putCustomer(customer) {
        return ApiTools.api.put(ApiTools.services.customers + "/" + customer._id, 
        {
            _id: customer._id,
            documentNumber: customer.documentNumber,
            firstName: customer.firstName,
            secondName: customer.secondName,
            lastName: customer.lastName,
            secondLastName: customer.secondLastName,
            adress: customer.adress,
            phone: customer.phone,
            documentType: customer.documentType
        });
    },
    deleteCustomer(id) {
        return ApiTools.api.delete(ApiTools.services.customers + "/" + id);
    }
}