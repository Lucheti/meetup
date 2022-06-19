import { BlitzPage, Routes, useParam, useRouter } from "blitz"
import Layout from "../../core/layouts/Layout"
import { Container, Grid, Space } from "@mantine/core"
import { UserDetail } from "../../users/components/userDetail/userDetail"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const UserPage: BlitzPage = () => {
  const userId = useParam("userId", "string")
  const router = useRouter()

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

UserPage.getLayout = (page) => <Layout title="User detail">{page}</Layout>

export default UserPage
