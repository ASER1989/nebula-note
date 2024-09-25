import React, {useState} from 'react';
import request from "@client/utils/request";
import useMessage from "@client/atoms/message/useMessage";
import {useTemplateConfigs} from "@client/models/templateStore/index";

const useStoreUpdate = () => {
    const [loading, setLoading] = useState(false);
    const {refreshOptions} = useTemplateConfigs();
    const {showMessage} = useMessage();
    const refreshStore = () => {
        setLoading(true);
        request.get('/template/store/update')
            .then((resp) => {
                if (!resp.success) {
                    return showMessage(resp.error.toString());
                }
                refreshOptions();
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return {loading, refreshStore};
}

export default useStoreUpdate;