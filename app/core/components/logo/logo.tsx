import { Avatar } from "@mantine/core"
import React from "react"
import { LogoStyles } from "./styles"
import { Routes, useRouter } from "blitz"

export const Logo = () => {
  const { classes } = LogoStyles()
  const router = useRouter()
  return (
    <Avatar
      classNames={{ root: classes.logo_container, placeholder: classes.logo_placeholder }}
      onClick={() => router.push(Routes.Home())}
    >
      Meetup
    </Avatar>
  )
}
