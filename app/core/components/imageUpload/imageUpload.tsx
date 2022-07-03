import React, { useRef } from "react"
import { Group, MantineTheme, Text, useMantineTheme } from "@mantine/core"
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone"
import { CloudUpload } from "tabler-icons-react"
import { pictureUploadStyles } from "./styles"

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme?.primaryColor]?.[6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black
}

type ImageUploadParams = {
  onUpload: (files: FormData) => void
  imageUrl?: string
}

export function ImageUpload({ onUpload, imageUrl }: ImageUploadParams) {
  const theme = useMantineTheme()
  const { classes } = pictureUploadStyles()
  const openRef = useRef<() => void>(null)
  const [loading, setLoading] = React.useState(false)

  const upload = async (files: File[]) => {
    setLoading(true)
    const form = new FormData()
    files.forEach((file) => form.append("files", file))
    await onUpload(form)
    setLoading(false)
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
        openRef={openRef || undefined}
        onDrop={upload}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, "image/png"]}
        maxSize={30 * 1024 ** 2}
        loading={loading}
        disabled={loading}
        multiple={false}
      >
        {(status) =>
          !imageUrl && (
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
                Drag&apos;n&apos;drop files here to upload. We can accept only <i>.jpg</i> files
                that are less than 30mb in size.
              </Text>
            </div>
          )
        }
      </Dropzone>
    </div>
  )
}
