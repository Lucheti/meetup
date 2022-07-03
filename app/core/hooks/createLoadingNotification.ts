import { v4 as uuidv4 } from "uuid"
import { NotificationProps } from "@mantine/notifications/lib/types"
import { showNotification, updateNotification } from "@mantine/notifications"

type CreateLoadingNotificationParams = {
  loading: NotificationProps
  success: NotificationProps
  error: NotificationProps
}

export const createLoadingNotification =
  ({ loading, success, error }: CreateLoadingNotificationParams) =>
  async <T>(fn: () => Promise<T>) => {
    const notificationId = uuidv4()
    try {
      showNotification({
        ...loading,
        id: notificationId,
      })
      const result = await fn()
      updateNotification({
        ...success,
        id: notificationId,
      })
      return result
    } catch (err) {
      updateNotification({
        ...error,
        id: notificationId,
      })
      throw err
    }
  }
