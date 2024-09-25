import React, {useMemo, useState} from 'react';
import request from "@client/utils/request";
import useMessage from "@client/atoms/message/useMessage";
import {DropdownOption} from "@client/atoms/dropdown";
import useStore from "@client/utils/store/useStore";

const useTemplateConfigs = () => {
    const [keyword, setKeyword] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useStore<Array<DropdownOption>>([], "template.options");
    const {showMessage} = useMessage();
    const refreshOptions = () => {
        setLoading(true);
        request.get<Array<DropdownOption>>('/template/list')
            .then((resp) => {
                if (!resp.success) {
                    return showMessage(
                        resp.error?.toString() ?? '发生未知错误，Schema拉取失败！',
                    );
                }
                setOptions(resp.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const filteredOptions = useMemo(() => {
        if (keyword) {
            const searchKeyword = keyword.toLocaleLowerCase();
            return options.filter((item) => {
                if (item.keyword && item.keyword.length > 0) {
                    return item.keyword.toLocaleLowerCase().includes(searchKeyword);
                }
                return item.label?.toLocaleLowerCase()?.includes(searchKeyword);
            });
        }
        return options;
    }, [options, keyword]);


    return {loading, options: filteredOptions, refreshOptions, setOptionKeyword: setKeyword};
}

export default useTemplateConfigs;