import {useState} from 'react';
import useMessage from "@client/components/message/useMessage";
import {useTemplateConfig} from "@client/models/template/index";
import {templateUpdate} from "@client/models/template/api";

const useStoreUpdate = () => {
  const [loading, setLoading] = useState(false);
  const {reloadTemplateConfig} = useTemplateConfig();
  const {showMessage} = useMessage();
  const refreshStore = () => {
    setLoading(true);
    templateUpdate().then((resp) => {
      if (!resp.success) {
        return showMessage(resp.error.toString());
      }
      reloadTemplateConfig();
    })
      .finally(() => {
        setLoading(false);
      })
  }
  return {loading, refreshStore};
}

export default useStoreUpdate;
