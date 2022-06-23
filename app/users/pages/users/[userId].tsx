import { BlitzPage, Routes, useParam, useRouter } from "blitz"
import Layout from "../../../core/layouts/Layout"
import { Container, Grid, Space } from "@mantine/core"
import { UserDetail } from "../../components/userDetail/userDetail"
import { useCurrentUser } from "../../../core/hooks/useCurrentUser"
import { useEffect } from "react"

const UserPage: BlitzPage = () => {
  const userId = useParam("userId", "string")
  const user = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (userId === user?.id) router.push(Routes.AccountSettingsPage())
  }, [])

  return (
    <Container size={"xl"}>
      <Space h={"lg"} />
      <Grid>
        <Grid.Col xs={12} md={6} lg={4} style={{ position: "relative" }}>
          <UserDetail userId={userId} showFollow={true} />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

UserPage.authenticate = true
UserPage.getLayout = (page) => <Layout title="User detail">{page}</Layout>

export default UserPage
