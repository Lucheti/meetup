import React, { useRef } from "react"
import {
  Text,
  Group,
  Button,
  createStyles,
  MantineTheme,
  useMantineTheme,
  Notification,
  Space,
} from "@mantine/core"
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone"
import { CloudUpload, InfoCircle } from "tabler-icons-react"
import { StrapiApi } from "../../../../integrations/strapi"
import { pictureUploadStyles } from "./styles"
import { invalidateQuery, useMutation } from "blitz"
import updateUserImageMutation from "../../mutations/updateUserImage"
import { showNotification } from "@mantine/notifications"
import getCurrentUser from "../../queries/getCurrentUser"

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme?.primaryColor]?.[6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black
}

export function PictureUpload() {
  const theme = useMantineTheme()
  const { classes } = pictureUploadStyles()
  const openRef = useRef<() => void>()
  const [updateUserImage, updateUserImageMeta] = useMutation(updateUserImageMutation)
  const [loading, setLoading] = React.useState(false)

  const upload = (files: File[]) => {
    setLoading(true)
    const form = new FormData()
    form.append("files", files[0]!)
    console.log("uploading files", form)
    StrapiApi.uploadImage(form)
      .then(async (res) => {
        const data = res[0]!
        console.log("data: ", data)
        await updateUserImage({
          images: {
            url_small: data.formats.small.url,
            url_medium: data.formats.medium.url,
            url_large: data.url,
          },
        })
        await invalidateQuery(getCurrentUser)
        await showNotification({
          title: `Image updated successfully`,
          message: "Look'n good 👍",
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log("error uploading image", err)
        showNotification({
          title: `Error uploading image`,
          message: "Something went wrong 😢",
        })
      })
  }

  return (
    <div className={classes.wrapper}>
      <Notification
        icon={<InfoCircle size={18} />}
        color="yellow"
        title="User picture"
        disallowClose
        style={{ boxShadow: "none" }}
      >
        There{"'"}s no user picture yet
      </Notification>

      <Space h={"lg"} />

      <Dropzone
        // @ts-ignore
        openRef={openRef || undefined}
        onDrop={upload}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, "image/png"]}
        maxSize={30 * 1024 ** 2}
        loading={loading}
        disabled={loading}
      >
        {(status) => (
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <CloudUpload size={50} color={getActiveColor(status, theme)} />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? "Drop files here"
                : status.rejected
                ? "jpg file less than 30mb"
                : "Upload picture"}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
              are less than 30mb in size.
            </Text>
          </div>
        )}
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef?.current?.()}
      >
        Select files
      </Button>
    </div>
  )
}
