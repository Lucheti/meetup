import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Anchor, Center, Container, Paper, Text, Title } from "@mantine/core"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Center style={{ height: "100vh" }}>
      <Container size={500}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor<"a">
            size="sm"
            onClick={(event) => {
              event.preventDefault()
              router.push(Routes.SignupPage())
            }}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <LoginForm
            onSuccess={(_user) => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              router.push(next)
            }}
          />
        </Paper>
      </Container>
    </Center>
  )
}

LoginPage.redirectAuthenticatedTo = "/"

export default LoginPage
