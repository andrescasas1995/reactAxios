import ApiTools from '../api';

export default {
    getDocumentTypes() {
        return ApiTools.api.get(ApiTools.services.documentTypes);
    }
}