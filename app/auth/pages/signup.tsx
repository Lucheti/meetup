import React from "react"
import { BlitzPage, Routes, useRouter } from "blitz"
import { SignupForm } from "app/auth/components/SignupForm"
import { Anchor, Center, Container, Paper, Text, Title } from "@mantine/core"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Center style={{ height: "100vh" }}>
        <Container size={500}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Let{"'"}s get you started!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{" "}
            <Anchor<"a">
              size="sm"
              onClick={(event) => {
                event.preventDefault()
                router.push(Routes.LoginPage())
              }}
            >
              Login
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <SignupForm onSuccess={() => router.push(Routes.CheckEmail())} />
          </Paper>
        </Container>
      </Center>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"

export default SignupPage
