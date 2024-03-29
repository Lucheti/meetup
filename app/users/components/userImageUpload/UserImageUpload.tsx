import { StrapiApi } from "../../../../integrations/strapi"
import { invalidateQuery, useMutation } from "blitz"
import getUser from "../../queries/getUser"
import { showNotification } from "@mantine/notifications"
import updateUserImageMutation from "../../mutations/updateUserImage"
import { ImageUpload } from "../../../core/components/imageUpload/imageUpload"

export const UserImageUpload = () => {
  const [updateUserImage] = useMutation(updateUserImageMutation)

  const onUpload = (form: FormData) => {
    return StrapiApi.uploadImage(form)
      .then(async (res) => {
        const data = res[0]!
        await updateUserImage({
          images: {
            url_small: data.formats.small.url,
            url_medium: data.formats.medium.url,
            url_large: data.url,
          },
        })
        await invalidateQuery(getUser)
        await showNotification({
          title: `Image updated successfully`,
          message: "Look'n good 👍",
        })
      })
      .catch((err) => {
        showNotification({
          title: `Error uploading image`,
          message: "Something went wrong 😢",
        })
      })
  }

  return <ImageUpload onUpload={onUpload} />
}
