import { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    const options = {
      integrationID: '1b126618-bc8d-400e-83f1-02fcf4c980c9',
      region: 'au-syd',
      serviceInstanceID: '71e6ffbd-d63c-44eb-83e7-14d778c66546',
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    window.watsonAssistantChatOptions = options;

    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${options.clientVersion || 'latest'}/WatsonAssistantChatEntry.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.watsonAssistantChatOptions;
    };
  }, []);

  return null;
};

export default WatsonChat;
