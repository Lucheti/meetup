import React from "react"
import { Burger, Button, Center, Container, Group, Header, Menu } from "@mantine/core"
import { useBooleanToggle } from "@mantine/hooks"
import { ChevronDown, ShoppingCart } from "tabler-icons-react"
import { HEADER_HEIGHT, NavbarStyles } from "./styles"
import { Routes, useRouter } from "blitz"
import { Logo } from "../logo/logo"
import { useMenuItems } from "./menuItems"
import { useCurrentUser } from "../../hooks/useCurrentUser"

export function NavigationBar() {
  const { classes, cx } = NavbarStyles()
  const [opened, toggleOpened] = useBooleanToggle(false)
  const router = useRouter()
  const menuItems = useMenuItems()
  const user = useCurrentUser()

  const items = menuItems.map((menuItem) => {
    const menuItems = menuItem.links?.map((item) => (
      <a
        key={item.label}
        onClick={(event) => {
          event.preventDefault()
          item.link && router.push(item.link)
        }}
      >
        <Menu.Item
          className={classes.pointer}
          onClick={item?.onClick}
          icon={item?.icon}
          color={item?.color}
          key={item?.label}
        >
          {item?.label}
        </Menu.Item>
      </a>
    ))

    if (menuItems) {
      return (
        <Menu
          key={menuItem.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              className={classes.link}
              onClick={(event) => {
                event.preventDefault()
                menuItem.link && router.push(menuItem.link)
              }}
            >
              <Center>
                <span className={cx(classes.linkLabel, classes.cursor_default)}>
                  {menuItem.label}
                </span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          <Menu.Label>{menuItem.label}</Menu.Label>
          {menuItems}
        </Menu>
      )
    }

    return (
      <a
        key={menuItem.label}
        className={cx(classes.link, classes.pointer)}
        onClick={(event) => {
          event.preventDefault()
          menuItem.link && router.push(menuItem.link)
        }}
      >
        {menuItem.label}
      </a>
    )
  })

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={40}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Logo />
        </Group>
        <Group spacing={5} className={classes.links}>
          {user && items}
        </Group>
        {!user && (
          <Button radius="xl" sx={{ height: 30 }} onClick={() => router.push(Routes.LoginPage())}>
            Login
          </Button>
        )}
        {user && (
          <Button
            radius="xl"
            color={"grape"}
            sx={{ height: 30 }}
            onClick={() => router.push(Routes.LoginPage())}
            leftIcon={<ShoppingCart size={12} />}
          >
            Marketplace
          </Button>
        )}
      </Container>
    </Header>
  )
}
