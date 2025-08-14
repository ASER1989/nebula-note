import { useCallback } from 'react';
import { imageBlockConfig } from '@milkdown/components/image-block';
import { Ctx } from '@milkdown/kit/ctx';

type Props = {
    id: string;
    onImageUpload?: (file: File) => Promise<string | undefined>;
};

const useImageBlock = ({ id, onImageUpload }: Props) => {
    const configSetup = useCallback(
        (ctx: Ctx) => {
            ctx.update(imageBlockConfig.key, (defaultConfig) => ({
                ...defaultConfig,
                onUpload: async (file: File) => {
                    const imgUrl = await onImageUpload?.(file);
                    if (!imgUrl) {
                        return '';
                    }
                    return imgUrl;
                },
                proxyDomURL: (url: string) => {
                    let hasHostname = true;
                    let isSameHostname = true;
                    try {
                        if (url) {
                            const urlObj = new URL(url);
                            isSameHostname = urlObj.hostname === window.location.hostname;
                        }
                    } catch (ex) {
                        hasHostname = false;
                    }

                    if (hasHostname && !isSameHostname) {
                        return url;
                    }

                    if (/note\/doc\/image/.test(url)) {
                        const newUrl = url.replace(
                            'note/doc/image',
                            `note/doc/image/${id}`,
                        );
                        return newUrl;
                    }

                    return url;
                },
            }));
        },
        [id, onImageUpload],
    );
    return configSetup;
};

export default useImageBlock;
