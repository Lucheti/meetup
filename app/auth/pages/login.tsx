import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Container, Row } from "@nextui-org/react"
import { useEffect } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Container
      css={{
        minHeight: "100vh",
        linearGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
      display={"flex"}
      xl
    >
      <Row justify="center" align="center">
        <Container display={"flex"}>
          <LoginForm
            onSuccess={(_user) => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              router.push(next)
            }}
          />
        </Container>
      </Row>
    </Container>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
