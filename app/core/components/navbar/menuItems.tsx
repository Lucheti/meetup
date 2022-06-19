import { Routes, RouteUrlObject, useMutation } from "blitz"
import { DefaultMantineColor } from "@mantine/core"
import React from "react"
import logoutMutation from "../../../auth/mutations/logout"
import { CalendarEvent, Logout, Plus, User } from "tabler-icons-react"

type HeaderItem = {
  label: string
  link?: RouteUrlObject
  onClick?: () => void
  color?: DefaultMantineColor
  icon?: React.ReactNode
}

type HeaderAction = HeaderItem & {
  links?: HeaderItem[]
}

export const useMenuItems = (): HeaderAction[] => {
  const [logout] = useMutation(logoutMutation)

  return [
    {
      link: Routes.Home(),
      label: "Home",
    },
    {
      label: "Events",
      links: [
        {
          label: "All Events",
          link: Routes.EventsPage(),
          color: "gray",
          icon: <CalendarEvent size={16} />,
        },
        {
          label: "Create Event",
          link: Routes.NewEventPage(),
          color: "gray",
          icon: <Plus size={16} />,
        },
      ],
    },
    {
      label: "Account",
      links: [
        {
          label: "My Account",
          color: "gray",
          icon: <User size={16} />,
          link: Routes.AccountSettingsPage(),
        },
        {
          label: "Logout",
          onClick: () => logout(),
          color: "red",
          icon: <Logout size={16} />,
        },
      ],
    },
  ]
}
