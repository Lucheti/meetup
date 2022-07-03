import { createStyles } from "@mantine/core"

export const pictureUploadStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    height: "100%",
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
    backgroundSize: "cover",
    height: "100%",
    minHeight: 250,
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}))
