import {useMemo, useState, useEffect} from 'react';
import useMessage from "@client/atoms/message/useMessage";
import {getTemplateList} from "@client/models/template/api";
import {TemplateConfig} from "@client/models/template/types";

const useTemplateConfig = () => {
  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [templateConfig, setTemplateConfig] = useState<Array<TemplateConfig>>([]);
  const {showMessage} = useMessage();

  const reloadTemplateConfig = () => {
    setLoading(true);
    getTemplateList()
      .then((resp) => {
        if (!resp.success) {
          return showMessage(
            resp.error?.toString() ?? '发生未知错误，Schema拉取失败！',
          );
        }
        setTemplateConfig(resp.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const filteredConfigs = useMemo(() => {
    if (keyword) {
      const searchKeyword = keyword.toLocaleLowerCase();
      return templateConfig.filter((item) => {
        if (item.keyword && item.keyword.length > 0) {
          return item.keyword.toLocaleLowerCase().includes(searchKeyword);
        }
        return item.name?.toLocaleLowerCase()?.includes(searchKeyword);
      });
    }
    return templateConfig;
  }, [templateConfig, keyword]);

  useEffect(() => {
    reloadTemplateConfig()
  }, []);

  return {loading, templateConfig: filteredConfigs, reloadTemplateConfig, setTemplateKeyword: setKeyword};
}

export default useTemplateConfig;
