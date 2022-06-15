import { Button, Card, Dropdown, Grid, Text } from "@nextui-org/react"
import logout from "app/auth/mutations/logout"
import { Routes, useMutation, useRouter } from "blitz"

const EventsDropdown = () => (
  <Dropdown>
    <Dropdown.Button>Events</Dropdown.Button>
    <Dropdown.Menu aria-label="Actions">
      <Dropdown.Item key="new">New event</Dropdown.Item>
      <Dropdown.Item key="copy">My events</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

const AccountDropdown = () => {
  const [logoutHandler] = useMutation(logout, {})

  return (
    <Dropdown>
      <Dropdown.Button>Account</Dropdown.Button>
      <Dropdown.Menu aria-label="Actions">
        <Dropdown.Item key="new">Settings</Dropdown.Item>
        <Dropdown.Item key="delete" withDivider color="error">
          <Text color="error" onClick={() => logoutHandler()}>
            Logout
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const Topbar = () => {
  const router = useRouter()
  const start = "meetup"

  return (
    <Card css={{ $$cardColor: "$colors$primary" }}>
      <Grid.Container gap={2} justify="flex-start">
        <Grid xs={12}>
          <EventsDropdown />
          <AccountDropdown />
        </Grid>
      </Grid.Container>
    </Card>
  )
}

const items = (push) => [
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    command: () => push(Routes.Home()),
  },
  {
    label: "Events",
    icon: "pi pi-fw pi-th-large",
    items: [
      {
        label: "New Event",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "My Events",
        icon: "pi pi-fw pi-th-large",
      },
    ],
  },
  {
    label: "Quit",
    icon: "pi pi-fw pi-power-off",
  },
]
