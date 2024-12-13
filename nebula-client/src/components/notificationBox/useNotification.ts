import {useContext} from "react";
import {NotificationContext} from "@client/components/notificationBox/context";

export const useNotification = () => useContext(NotificationContext);
export default useNotification;
